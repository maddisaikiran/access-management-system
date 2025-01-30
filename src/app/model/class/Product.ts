export class Product {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productShortName: string;
    createdDate: string;
    deliveryTimeSpan: string;
    productImageUrl: string;

    constructor() {
        this.productId = 0;
        this.productName = '';
        this.productDescription = '';
        this.productShortName = '';
        this.productPrice = 0;
        this.productImageUrl = '';
        this.deliveryTimeSpan= '';
        this.createdDate = '';
    }
  }