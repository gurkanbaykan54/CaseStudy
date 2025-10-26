import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { CreateProductRequest } from '../services/product';

interface AddProductModalProps {
    visible: boolean;
    onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onClose }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');



    const handleClose = () => {
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        onClose();
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert('Hata', 'Ürün adı boş olamaz!');
            return;
        }

        if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
            Alert.alert('Hata', 'Geçerli bir fiyat giriniz!');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Hata', 'Ürün açıklaması boş olamaz!');
            return;
        }

        const productData: CreateProductRequest = {
            title: title.trim(),
            price: Number(price),
            description: description.trim(),
            category: category.trim() || 'electronics',
        };

        Alert.alert('yeni ürün eklemek için gerekli kodu yazınız');
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Yeni Ürün Ekle</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Ürün Adı *</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Ürün adını girin..."
                                maxLength={100}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Fiyat *</Text>
                            <TextInput
                                style={styles.input}
                                value={price}
                                onChangeText={setPrice}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                maxLength={10}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Kategori</Text>
                            <TextInput
                                style={styles.input}
                                value={category}
                                onChangeText={setCategory}
                                placeholder="electronics, clothing, jewelery..."
                                maxLength={50}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Açıklama *</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Ürün açıklamasını girin..."
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                maxLength={500}
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleClose}
                        >
                            <Text style={styles.cancelButtonText}>İptal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.submitButton]}
                            onPress={handleSubmit}

                        >

                            <Text style={styles.submitButtonText}>Ürün Ekle</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
        minHeight: '60%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default AddProductModal;
