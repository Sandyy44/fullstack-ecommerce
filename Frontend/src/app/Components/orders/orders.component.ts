import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderProduct {
    name: string;
    productId: string;
    quantity: number;
    unitePrice: number;
    finalPrice: number;
    image?: string;
}

interface Order {
    id: string;
    userId: string;
    updatedBy: string;
    products: OrderProduct[];
    address: string;
    phone: string;
    finalPrice: number;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    note: string;
    reason: string;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
    orderNumber: string;
    estimatedDelivery?: Date;
    trackingNumber?: string;
}

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    filteredOrders: Order[] = [];
    selectedStatus: string = 'all';
    searchTerm: string = '';
    isLoading = false;
    selectedOrder: Order | null = null;
    showOrderDetails = false;

    ngOnInit() {
        this.loadOrders();
        this.filteredOrders = [...this.orders];
    }

    loadOrders() {
        // Sample orders data
        this.orders = [
            {
                id: '1',
                userId: 'user123',
                updatedBy: 'admin',
                products: [
                    {
                        name: 'MacBook Pro M3',
                        productId: 'prod1',
                        quantity: 1,
                        unitePrice: 45000,
                        finalPrice: 45000,
                        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop'
                    }
                ],
                address: '123 Main Street, Cairo, Egypt',
                phone: '+20 123 456 7890',
                finalPrice: 45000,
                status: 'delivered',
                note: 'Please deliver during business hours',
                reason: '',
                paymentMethod: 'Credit Card',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-18'),
                orderNumber: 'ORD-2024-001',
                estimatedDelivery: new Date('2024-01-20'),
                trackingNumber: 'TRK123456789'
            },
            {
                id: '2',
                userId: 'user123',
                updatedBy: 'admin',
                products: [
                    {
                        name: 'iPhone 15 Pro Max',
                        productId: 'prod2',
                        quantity: 1,
                        unitePrice: 38000,
                        finalPrice: 38000,
                        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop'
                    },
                    {
                        name: 'AirPods Pro 2',
                        productId: 'prod3',
                        quantity: 1,
                        unitePrice: 6500,
                        finalPrice: 6500,
                        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf0?w=200&h=200&fit=crop'
                    }
                ],
                address: '456 Oak Avenue, Alexandria, Egypt',
                phone: '+20 987 654 3210',
                finalPrice: 44500,
                status: 'shipped',
                note: 'Fragile items, handle with care',
                reason: '',
                paymentMethod: 'PayPal',
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-01-22'),
                orderNumber: 'ORD-2024-002',
                estimatedDelivery: new Date('2024-01-25'),
                trackingNumber: 'TRK987654321'
            },
            {
                id: '3',
                userId: 'user123',
                updatedBy: 'admin',
                products: [
                    {
                        name: 'Sony WH-1000XM5',
                        productId: 'prod4',
                        quantity: 1,
                        unitePrice: 8500,
                        finalPrice: 8500,
                        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
                    }
                ],
                address: '789 Pine Road, Giza, Egypt',
                phone: '+20 555 123 4567',
                finalPrice: 8500,
                status: 'processing',
                note: 'Preferred delivery time: 2-4 PM',
                reason: '',
                paymentMethod: 'Cash on Delivery',
                createdAt: new Date('2024-01-25'),
                updatedAt: new Date('2024-01-25'),
                orderNumber: 'ORD-2024-003',
                estimatedDelivery: new Date('2024-01-30')
            },
            {
                id: '4',
                userId: 'user123',
                updatedBy: 'admin',
                products: [
                    {
                        name: 'iPad Pro 12.9"',
                        productId: 'prod5',
                        quantity: 1,
                        unitePrice: 28000,
                        finalPrice: 28000,
                        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop'
                    }
                ],
                address: '321 Elm Street, Luxor, Egypt',
                phone: '+20 777 888 9999',
                finalPrice: 28000,
                status: 'cancelled',
                note: '',
                reason: 'Customer requested cancellation',
                paymentMethod: 'Credit Card',
                createdAt: new Date('2024-01-28'),
                updatedAt: new Date('2024-01-29'),
                orderNumber: 'ORD-2024-004'
            }
        ];
    }

    filterOrders() {
        this.filteredOrders = this.orders.filter(order => {
            const matchesStatus = this.selectedStatus === 'all' || order.status === this.selectedStatus;
            const matchesSearch = order.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                order.products.some(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
            return matchesStatus && matchesSearch;
        });
    }

    onStatusChange() {
        this.filterOrders();
    }

    onSearchChange() {
        this.filterOrders();
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'pending': return '#ffc107';
            case 'confirmed': return '#17a2b8';
            case 'processing': return '#007bff';
            case 'shipped': return '#6f42c1';
            case 'delivered': return '#28a745';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    }

    getStatusText(status: string): string {
        switch (status) {
            case 'pending': return 'Pending';
            case 'confirmed': return 'Confirmed';
            case 'processing': return 'Processing';
            case 'shipped': return 'Shipped';
            case 'delivered': return 'Delivered';
            case 'cancelled': return 'Cancelled';
            default: return status;
        }
    }

    getStatusIcon(status: string): string {
        switch (status) {
            case 'pending': return '⏳';
            case 'confirmed': return '✅';
            case 'processing': return '⚙️';
            case 'shipped': return '🚚';
            case 'delivered': return '��';
            case 'cancelled': return '❌';
            default: return '📋';
        }
    }

    viewOrderDetails(order: Order) {
        this.selectedOrder = order;
        this.showOrderDetails = true;
    }

    closeOrderDetails() {
        this.showOrderDetails = false;
        this.selectedOrder = null;
    }

    cancelOrder(order: Order) {
        if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
            order.status = 'cancelled';
            order.reason = 'Cancelled by customer';
            order.updatedAt = new Date();
            this.filterOrders();
        }
    }

    reorder(order: Order) {
        // Here you can add logic to reorder
        alert(`Adding ${order.products.length} items to cart for reorder`);
    }

    trackOrder(order: Order) {
        if (order.trackingNumber) {
            alert(`Tracking number: ${order.trackingNumber}\nEstimated delivery: ${order.estimatedDelivery?.toLocaleDateString()}`);
        } else {
            alert('Tracking information not available yet');
        }
    }

    getTotalItems(order: Order): number {
        return order.products.reduce((sum, product) => sum + product.quantity, 0);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}