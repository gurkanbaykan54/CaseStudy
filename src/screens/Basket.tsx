import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import BasketItem from '../components/BasketItem';

const BasketScreen = () => {
    const { basket, getTotalPrice, getTotalItems } = useAppContext();

    const handleRemoveItem = () => {
        Alert.alert('Lütfen ürünü kaldırmak için bir ihtiyaç duyulan kodu yazınız');
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        Alert.alert('Lütfen ürünün miktarını değiştirmek için bir ihtiyaç duyulan kodu yazınız');
    };


    const renderFooter = () => (
        <View style={styles.footer}>
            <View style={styles.totalContainer}>
                <Text style={styles.totalItems}>Toplam Ürün: {getTotalItems()}</Text>
                <Text style={styles.totalPrice}>Toplam Tutar: ${getTotalPrice().toFixed(2)}</Text>
            </View>

            {basket.length > 0 && (
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Siparişi Tamamla</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    if (basket.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <MaterialIcons name="shopping-cart" size={80} color="#ccc" />
                <Text style={styles.emptyText}>Sepetiniz boş</Text>
                <Text style={styles.emptySubtext}>Ürün eklemek için ana sayfaya gidin</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Sepetim</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            >
                {basket.map((item) => (
                    <BasketItem
                        key={item.product.id.toString()}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}

                    />
                ))}
                {renderFooter()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    scrollView: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666',
        marginTop: 20,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    footer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    totalContainer: {
        marginBottom: 20,
    },
    totalItems: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BasketScreen;