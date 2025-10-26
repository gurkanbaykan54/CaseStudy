import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Dimensions,
    TextInput,

} from 'react-native';
import { getProductList } from '../services/product';
import { Product } from '../context/AppContext';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AddProductModal from '../components/AddProductModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

const HomeScreen = () => {
    const navigation = useNavigation();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    const {
        data: products = [],
        isLoading: loading,
        refetch: refetchProducts,
        error
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProductList,
        enabled: false,
        staleTime: 5 * 60 * 1000,
    });


    useEffect(() => {
        refetchProducts();
    }, [refetchProducts]);


    useEffect(() => {
        const filtered = products.filter((product: Product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, searchTerm]);


    useEffect(() => {
        const total = products.reduce((sum: number, product: Product) => sum + product.price, 0);
        setTotalPrice(total);
    }, [products]);




    const handleAddToBasket = (product: Product) => {
        Alert.alert('Sepete eklemek için gerekli kodu yazın');
    };


    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => {
                if (item && item.id) {
                    (navigation as any).navigate('ProductDetails', { product: item });
                }
            }}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} resizeMode='contain' />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                    style={styles.productAddButton}
                    onPress={(e) => {
                        e.stopPropagation();
                        handleAddToBasket(item);
                    }}
                >
                    <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
                    <Text style={styles.productAddButtonText}>Sepete Ekle</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Ürünler yükleniyor...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Ürünler</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setIsAddModalVisible(true)}
                    >
                        <MaterialIcons name="add" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Yeni Ürün</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.totalPriceText}>Toplam Değer: ${totalPrice.toFixed(2)}</Text>


                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Ürün ara..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholderTextColor="#999"
                    />
                    {searchTerm.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => setSearchTerm('')}
                        >
                            <MaterialIcons name="clear" size={20} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={filteredProducts}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />

                <AddProductModal
                    visible={isAddModalVisible}
                    onClose={() => setIsAddModalVisible(false)}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
    },
    totalPriceText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 15,
        color: '#007AFF',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: cardWidth,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 12,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        lineHeight: 18,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 12,
    },
    productAddButton: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 8,
    },
    productAddButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 5,
    },
});

export default HomeScreen;