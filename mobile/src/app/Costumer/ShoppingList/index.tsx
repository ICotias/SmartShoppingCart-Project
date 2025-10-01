import { styles } from './styles'
import { useMemo, useState } from 'react'
import { ListTab } from '@/components/ListTab'
import { Spacing } from '@/components/Spacing'
import { ListHeader } from '@/components/ListHeader'
import { ItemStorage } from '@/storage/itensStorage'
import { FilterStatus } from '@/@types/filterStatus'
import { View, FlatList, Text, Alert, Modal } from 'react-native'
import { CostumerRoutesProps } from '@/routes/CostumerRoutes'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { BackArrow } from '@/assets/BackArrow'
import { AddIcon } from '@/assets/AddIcon'
import { useShoppingList } from '@/contexts/ShoppingList'

export function ShoppingList({
  navigation,
  route,
}: CostumerRoutesProps<'shoppinglist'>) {
  const {
    shoppingLists,
    addProductToShoppingList,
    removeProductFromShoppingList,
    handleChangeProductStatus,
    handleClearShoppingList,
  } = useShoppingList()
  const [focused, setFocused] = useState<FilterStatus>(FilterStatus.PENDING)
  const listId = route.params?.shoppingListId
  const [showAddListModal, setShowAddListModal] = useState(false)
  const [newProductName, setNewProductName] = useState('')

  async function handleChangeStatus(status: FilterStatus) {
    setFocused(status)
  }

  function handleClear() {
    Alert.alert('Limpar', 'Deseja remover todos?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => handleClearShoppingList(listId) },
    ])
  }

  function handleOpenAddListModal() {
    setShowAddListModal(true)
    setNewProductName('')
  }

  async function handleAddNewList() {
    if (!newProductName.trim()) {
      return Alert.alert(
        'Adicionar',
        'Não é permitido a adição de valores vazios'
      )
    }

    const existingList = shoppingList?.products.find(
      (item) => item.name.toLowerCase() === newProductName.toLowerCase()
    )

    if (existingList) {
      return Alert.alert(
        'Produto já existe',
        'Este produto já está na sua lista de compras'
      )
    }

    const newProduct: ItemStorage = {
      id: Date.now().toString(),
      name: newProductName,
      status: FilterStatus.PENDING,
    }

    addProductToShoppingList(listId, newProduct)
    setNewProductName('')
    setShowAddListModal(false)
  }

  function handleCancelAddList() {
    setNewProductName('')
    setShowAddListModal(false)
  }

  const shoppingList = useMemo(
    () => shoppingLists?.find((list) => list.id === listId),
    [shoppingLists, listId]
  )

  if (!listId) return null

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <Button
              onPress={() => navigation.goBack()}
              variant='addButton'
              content={<BackArrow color='white' width={24} height={24} />}
            />
            <Text style={styles.listTitle}>{shoppingList?.name}</Text>
            <Button
              onPress={handleOpenAddListModal}
              variant='addButton'
              content={<AddIcon color='white' width={24} height={24} />}
            />
          </View>
          <Spacing size='lg' />
        </View>

        <View style={styles.bottomContainer}>
          <ListHeader
            focused={focused}
            onSelect={handleChangeStatus}
            onClear={handleClear}
          />
          <FlatList
            data={shoppingList?.products?.filter(
              (product) => product.status === focused
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ListTab
                products={item}
                onRemove={() => removeProductFromShoppingList(listId, item.id)}
                onToggleStatus={() =>
                  handleChangeProductStatus(
                    listId,
                    item.id,
                    item.status === FilterStatus.PENDING
                      ? FilterStatus.BOUGHT
                      : FilterStatus.PENDING
                  )
                }
                onPress={() => {}}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.grayBorderBottom}></View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.itensContainer}>
                <Text style={styles.itensText}>
                  Nenhuma lista adicionada ainda
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <Modal
        visible={showAddListModal}
        transparent={true}
        animationType='fade'
        onRequestClose={handleCancelAddList}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Produto</Text>

            <Input
              placeholder='Nome do produto'
              value={newProductName}
              onChangeText={setNewProductName}
            />

            <Spacing size='md' />

            <View style={styles.modalButtons}>
              <Button
                onPress={handleAddNewList}
                variant='default'
                content='Adicionar Produto'
              />
              <Spacing size='sm' />
              <Button
                onPress={handleCancelAddList}
                variant='white'
                content='Cancelar'
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
