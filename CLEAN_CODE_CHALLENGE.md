# React Clean Code Challenge

Bu proje, React clean code prensiplerini test etmek için kasıtlı olarak kötü kod örnekleri içermektedir. Adayların bu sorunları tespit edip düzeltmeleri beklenmektedir.

## 🎯 Test Edilecek Konular

### 1. Gereksiz Effect'ler (Unnecessary Effects)
- **HomeScreen.tsx**: Data transformation için gereksiz Effect'ler
- **AppContext.tsx**: Derived state için gereksiz Effect'ler  
- **ProductItem.tsx**: Prop synchronization için gereksiz Effect'ler

### 2. Gereksiz State Değişkenleri (Redundant State)
- `filteredProducts`, `totalPrice`, `basketCount`, `basketTotal`, `isBasketEmpty` gibi state'ler
- Bu değerler mevcut state'den hesaplanabilir

### 3. Pahalı Hesaplamalar (Expensive Calculations)
- `calculateExpensiveStats` fonksiyonu her render'da çalışıyor
- Memoization kullanılmıyor

### 4. Race Condition'lar
- `searchProducts` fonksiyonunda cleanup yok
- Hızlı yazımda eski sonuçlar yeni sonuçları eziyor

### 5. User Event'ler için Gereksiz Effect'ler
- Edit butonuna tıklama için Effect kullanılıyor
- Event handler'da yapılması gereken işlemler Effect'te

## 🔧 Çözüm Beklentileri

### Adayların Yapması Gerekenler:

1. **Gereksiz Effect'leri Kaldırma**
   ```javascript
   // ❌ Kötü
   useEffect(() => {
     setFilteredProducts(products.filter(...));
   }, [products]);

   // ✅ İyi
   const filteredProducts = products.filter(...);
   ```

2. **Gereksiz State'leri Kaldırma**
   ```javascript
   // ❌ Kötü
   const [basketCount, setBasketCount] = useState(0);
   useEffect(() => {
     setBasketCount(basket.reduce(...));
   }, [basket]);

   // ✅ İyi
   const basketCount = basket.reduce(...);
   ```

3. **Memoization Ekleme**
   ```javascript
   // ❌ Kötü
   useEffect(() => {
     const stats = calculateExpensiveStats(products);
     setExpensiveStats(stats);
   }, [products]);

   // ✅ İyi
   const expensiveStats = useMemo(() => 
     calculateExpensiveStats(products), [products]
   );
   ```

4. **Race Condition'ları Düzeltme**
   ```javascript
   // ❌ Kötü
   useEffect(() => {
     searchProducts(query).then(setResults);
   }, [query]);

   // ✅ İyi
   useEffect(() => {
     let ignore = false;
     searchProducts(query).then(results => {
       if (!ignore) setResults(results);
     });
     return () => { ignore = true; };
   }, [query]);
   ```

5. **Event Handler'lara Taşıma**
   ```javascript
   // ❌ Kötü
   useEffect(() => {
     if (isEditing) console.log('editing...');
   }, [isEditing]);

   // ✅ İyi
   const handleEdit = () => {
     setIsEditing(true);
     console.log('editing...');
   };
   ```

## 📚 Referans Dokümanı

[React.dev - You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## 🎯 Değerlendirme Kriterleri

- **Tespit Etme**: Hangi kod parçalarının sorunlu olduğunu bulabilme
- **Çözüm**: Doğru çözümleri uygulayabilme  
- **Performans**: Memoization ve optimization anlayışı
- **Clean Code**: Kodun okunabilirliği ve maintainability'si
- **React Patterns**: Modern React pattern'lerini bilme

## 🚀 Başlama

1. Projeyi çalıştırın: `yarn start`
2. Sorunlu kod parçalarını tespit edin
3. Clean code prensiplerine göre düzeltin
4. Performans optimizasyonları yapın

**İyi şanslar! 🍀**

