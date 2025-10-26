import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { BasketItem as BasketItemType } from '../context/AppContext';
import RenameModal from './RenameModal';

interface BasketItemProps {
    item: BasketItemType;
    onQuantityChange: (productId: number, newQuantity: number) => void;
    onRemoveItem: (productId: number, productTitle: string) => void;
    onRenameProduct: (productId: number, newTitle: string) => void;
}

const BasketItem: React.FC<BasketItemProps> = ({
    item,
    onQuantityChange,
    onRemoveItem,
    onRenameProduct,
}) => {
    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(item.product.title);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        setDisplayTitle(item.product.title);
    }, [item.product.title]);


    useEffect(() => {
        if (isEditing) {
            console.log('User is editing product:', item.product.title);
        }
    }, [isEditing, item.product.title]);

    const handleRename = (newTitle: string) => {
        Alert.alert('Lütfen ürün adını değiştirmek için bir ihtiyaç duyulan kodu yazınız');
    };

    return (
        <>
            <View style={styles.basketItem}>
                <View style={styles.leftSection}>
                    <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                    <TouchableOpacity
                        style={styles.editButtonOutside}
                        onPress={() => {
                            setIsEditing(true);
                            setIsRenameModalVisible(true);
                        }}
                    >
                        <MaterialIcons name="edit" size={16} color="#007AFF" />
                        <Text style={styles.editButtonText}>Düzenle</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                        {displayTitle}
                    </Text>
                    <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => onQuantityChange(item.product.id, item.quantity - 1)}
                        >
                            <MaterialIcons name="remove" size={20} color="#007AFF" />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => onQuantityChange(item.product.id, item.quantity + 1)}
                        >
                            <MaterialIcons name="add" size={20} color="#007AFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onRemoveItem(item.product.id, item.product.title)}
                >
                    <MaterialIcons name="delete" size={24} color="#FF3B30" />
                </TouchableOpacity>
            </View>

            <RenameModal
                visible={isRenameModalVisible}
                currentTitle={item.product.title}
                onClose={() => {
                    setIsRenameModalVisible(false);
                    setIsEditing(false);
                }}
                onRename={handleRename}
            />
        </>
    );
};

const styles = StyleSheet.create({
    basketItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftSection: {
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    editButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#007AFF',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    editButtonOutside: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 8,
    },
    editButtonText: {
        fontSize: 12,
        color: '#007AFF',
        marginLeft: 4,
        fontWeight: '600',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 15,
        color: '#333',
    },
    removeButton: {
        padding: 10,
    },
});

export default BasketItem;
