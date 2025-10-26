import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Product } from '../context/AppContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ProductDetails: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as { product?: Product };
    const product = params?.product;


    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Ürün bulunamadı</Text>
            </View>
        );
    }

    const handleAddToBasket = () => {
        Alert.alert('Lütfen sepete eklemek için bir ihtiyaç duyulan kodu yazınız');
    };

    return (
        <ScrollView style={styles.container}>

            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
            </View>

            {/* Product Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{product.title}</Text>

                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

                <View style={styles.categoryContainer}>
                    <MaterialIcons name="category" size={16} color="#666" />
                    <Text style={styles.categoryText}>{product.category}</Text>
                </View>

                <Text style={styles.descriptionTitle}>Açıklama</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>

            {/* Add to Basket Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.addToBasketButton}
                    onPress={handleAddToBasket}
                >
                    <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
                    <Text style={styles.addToBasketText}>Sepete Ekle</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    placeholder: {
        width: 40,
    },
    imageContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 10,
    },
    productImage: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        lineHeight: 32,
    },
    productPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 15,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
        textTransform: 'capitalize',
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    buttonContainer: {
        padding: 20,
        backgroundColor: '#fff',
    },
    addToBasketButton: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addToBasketText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
});

export default ProductDetails;
