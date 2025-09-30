import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Cloud Function para sincronizar dados
export const syncUserData = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { items, userId } = data;
  const db = admin.firestore();

  try {
    const batch = db.batch();
    
    // Atualizar itens do usuário
    const userRef = db.collection("users").doc(userId);
    batch.set(userRef, {
      items,
      lastSync: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    await batch.commit();
    
    return { success: true, message: "Data synchronized successfully" };
  } catch (error) {
    console.error("Error syncing user data:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while syncing data"
    );
  }
});

// Cloud Function para notificações
export const sendNotification = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { token, title, body } = data;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    return { success: true, messageId: response };
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while sending notification"
    );
  }
});
