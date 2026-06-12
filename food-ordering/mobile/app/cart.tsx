import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCartStore } from '../src/store/cartStore';
import { useAuthStore } from '../src/store/authStore';
import client from '../src/api/client';
import { useThemeStore } from '../src/store/themeStore';

export default function CartScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#0f172a' : '#f5f7fa',
    headerBg: isDark ? '#1e293b' : '#ffffff',
    headerBorder: isDark ? '#334155' : '#eeeeee',
    text: isDark ? '#ffffff' : '#111111',
    subtext: isDark ? '#94a3b8' : '#666666',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    cardBorder: isDark ? '#334155' : '#eeeeee',
    inputBg: isDark ? '#1e293b' : '#f1f1f1',
    inputText: isDark ? '#ffffff' : '#333333',
    divider: isDark ? '#334155' : '#f5f5f5',
    qtyBtnBg: isDark ? '#334155' : '#f1f1f1',
    qtyBtnText: isDark ? '#ffffff' : '#333333',
    promoBtnBg: isDark ? '#ffffff' : '#111111',
    promoBtnText: isDark ? '#0f172a' : '#ffffff',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    pickupOptionBg: isDark ? '#334155' : '#f5f5f5',
    pickupOptionActiveBg: isDark ? '#ffffff' : '#111111',
    pickupOptionText: isDark ? '#cbd5e1' : '#555555',
    pickupOptionActiveText: isDark ? '#0f172a' : '#ffffff',
    totalBoxBg: isDark ? '#1e293b' : '#fafafa',
  };

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [tip, setTip] = useState(0);
  const [pickupTime, setPickupTime] = useState('15 minutes');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('ORD00000');

  // Math Calculations
  const subtotal = cart.reduce((acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1), 0);
  const gst = subtotal * 0.05;
  const totalPrice = subtotal + gst + tip - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
      Alert.alert('Promo Code Applied', '🎉 You saved 10% on your subtotal!');
    } else {
      Alert.alert('Invalid Promo', '⚠️ This promo code does not exist.');
    }
  };

  const handleProceedCheckout = () => {
    if (!cart.length) {
      Alert.alert('Cart Empty', '🛒 Add some tasty items first.');
      return;
    }
    if (!user) {
      Alert.alert('Login Required', '🔑 Please sign in to complete your checkout.');
      router.push('/login');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handlePlaceOrder = async () => {
    if (!user || !cart.length) return;

    try {
      setIsLoading(true);
      const restaurantId = cart[0].restaurantId;
      const orderItems = cart.map((c) => ({
        name: c.item.name,
        price: c.item.price,
        quantity: c.quantity,
        image: c.item.image,
      }));

      const res = await client.post('/orders', {
        items: orderItems,
        totalPrice,
        restaurantId,
        pickupTime,
      });

      if (res.status === 201) {
        const generatedNum = res.data.orderNumber || 'ORD00001';
        setOrderNumber(generatedNum);
        
        // Clear Store State
        clearCart();

        setShowCheckoutModal(false);
        setShowSuccessModal(true);
      } else {
        Alert.alert('Error', '⚠️ Failed to place order. Please check again.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      Alert.alert('Checkout Error', err.response?.data?.message || 'Failed to place order. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.replace('/orders');
  };

  const resolveImg = (img: string | undefined) => {
    if (!img) return 'https://placehold.co/100x100?text=Food';
    if (img.startsWith('http')) return img;
    const baseUrl = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${img.replace(/\\/g, '/').replace(/^\/+/, '')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Your Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
            <Text style={[styles.emptySub, { color: colors.subtext }]}>Browse outlets and add some delicious items!</Text>
            <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/restaurants')}>
              <Text style={styles.exploreBtnText}>Browse Outlets</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[styles.itemSummaryText, { color: colors.subtext }]}>{cart.length} item(s) ready to checkout</Text>
            
            {/* Cart Items List */}
            <View style={[styles.itemsCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: isDark ? 1 : 0 }]}>
              {cart.map((c, idx) => (
                <View key={c.item._id || idx} style={[styles.cartItem, { borderBottomColor: colors.divider }, idx === cart.length - 1 && styles.lastItem]}>
                  <Image source={{ uri: resolveImg(c.item.image) }} style={styles.itemImg} />
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{c.item.name}</Text>
                    <Text style={[styles.itemPrice, { color: colors.subtext }]}>₹{c.item.price} each</Text>
                    
                    <View style={[styles.qtyContainer, { backgroundColor: colors.qtyBtnBg }]}>
                      <TouchableOpacity 
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(c.item._id, c.quantity - 1)}
                      >
                        <Text style={[styles.qtyBtnText, { color: colors.qtyBtnText }]}>-</Text>
                      </TouchableOpacity>
                      <Text style={[styles.qtyText, { color: colors.text }]}>{c.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(c.item._id, c.quantity + 1)}
                      >
                        <Text style={[styles.qtyBtnText, { color: colors.qtyBtnText }]}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => updateQuantity(c.item._id, 0)}>
                    <Text style={styles.deleteBtnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Promo Code Input */}
            <View style={[styles.promoCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: isDark ? 1 : 0 }]}>
              <TextInput
                style={[styles.promoInput, { backgroundColor: colors.inputBg, color: colors.inputText }]}
                placeholder="Enter Promo Code (e.g. SAVE10)"
                placeholderTextColor={isDark ? '#cbd5e1' : '#999'}
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity style={[styles.promoBtn, { backgroundColor: colors.promoBtnBg }]} onPress={handleApplyPromo}>
                <Text style={[styles.promoBtnText, { color: colors.promoBtnText }]}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* Billing Summary */}
            <View style={[styles.summaryCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: isDark ? 1 : 0 }]}>
              <Text style={[styles.summaryTitle, { color: colors.text, borderBottomColor: colors.divider }]}>Bill Details</Text>
              
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Subtotal</Text>
                <Text style={[styles.summaryVal, { color: colors.text }]}>₹{subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.subtext }]}>GST (5%)</Text>
                <Text style={[styles.summaryVal, { color: colors.text }]}>₹{gst.toFixed(2)}</Text>
              </View>

              {discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, styles.discountText]}>Promo Discount</Text>
                  <Text style={[styles.summaryVal, styles.discountText]}>-₹{discount.toFixed(2)}</Text>
                </View>
              )}

              <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: colors.divider }]}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>Grand Total</Text>
                <Text style={styles.totalVal}>₹{totalPrice.toFixed(2)}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={handleProceedCheckout}>
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Checkout Modal */}
      <Modal visible={showCheckoutModal} animationType="slide" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: colors.modalOverlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.headerBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Complete Your Order</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
                <Text style={[styles.closeModalText, { color: colors.subtext }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtext, { color: colors.subtext }]}>Verify your pickup time before confirming.</Text>

            <View style={styles.modalForm}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Pickup Cooldown Option</Text>
              
              <View style={styles.pickupGrid}>
                {['15 minutes', '30 minutes', '45 minutes', '1 hour'].map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.pickupOption, 
                      { backgroundColor: pickupTime === time ? colors.pickupOptionActiveBg : colors.pickupOptionBg }
                    ]}
                    onPress={() => setPickupTime(time)}
                  >
                    <Text style={[
                      styles.pickupText, 
                      { color: pickupTime === time ? colors.pickupOptionActiveText : colors.pickupOptionText }
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.totalBox, { backgroundColor: colors.totalBoxBg, borderColor: colors.headerBorder }]}>
                <Text style={[styles.totalBoxLabel, { color: colors.subtext }]}>Cash Payment at Pickup</Text>
                <Text style={styles.totalBoxPrice}>₹{totalPrice.toFixed(2)}</Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalCancelBtn, { borderColor: colors.headerBorder }]} onPress={() => setShowCheckoutModal(false)}>
                  <Text style={[styles.modalCancelText, { color: colors.subtext }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalConfirmBtn, isLoading && styles.disabledBtn]} 
                  onPress={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.modalConfirmText}>Place Order</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} animationType="fade" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: colors.modalOverlay }]}>
          <View style={[styles.successContent, { backgroundColor: colors.headerBg }]}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successTitle}>Order Confirmed!</Text>
            <Text style={[styles.successSub, { color: colors.subtext }]}>Your food is being prepared.</Text>

            <View style={[styles.orderNumberCard, { backgroundColor: colors.inputBg, borderColor: colors.headerBorder }]}>
              <Text style={styles.orderNumberLabel}>Order ID</Text>
              <Text style={[styles.orderNumber, { color: colors.text }]}>{orderNumber}</Text>
            </View>

            <Text style={[styles.successNote, { color: colors.subtext }]}>
              Estimated pickup in <Text style={{fontWeight: 'bold', color: colors.text}}>{pickupTime}</Text>.{'\n'}
              Show this Order ID at the counter to pay and collect your food.
            </Text>

            <TouchableOpacity style={[styles.successBtn, { backgroundColor: colors.promoBtnBg }]} onPress={handleSuccessClose}>
              <Text style={[styles.successBtnText, { color: colors.promoBtnText }]}>Track Order History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  backBtnText: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111',
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 50,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  emptySub: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  exploreBtn: {
    backgroundColor: '#E63946',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  exploreBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSummaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  itemsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemImg: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: '#111',
  },
  deleteBtn: {
    padding: 10,
  },
  deleteBtnText: {
    fontSize: 18,
  },
  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  promoBtn: {
    backgroundColor: '#111',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  promoBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 25,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    paddingBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryVal: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
  },
  discountText: {
    color: '#2e7d32',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E63946',
  },
  checkoutBtn: {
    backgroundColor: '#E63946',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111',
  },
  closeModalText: {
    fontSize: 22,
    color: '#777',
    fontWeight: '500',
    padding: 5,
  },
  modalSubtext: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  modalForm: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pickupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  pickupOption: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  pickupOptionActive: {
    backgroundColor: '#111',
  },
  pickupText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  pickupTextActive: {
    color: '#fff',
  },
  totalBox: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  totalBoxLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  totalBoxPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#E63946',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#555',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalConfirmBtn: {
    flex: 2,
    backgroundColor: '#E63946',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  modalConfirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  successContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  successIcon: {
    fontSize: 55,
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  successSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  orderNumberCard: {
    backgroundColor: '#f9f9f9',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  orderNumberLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 2,
  },
  successNote: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 25,
  },
  successBtn: {
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
  },
  successBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
