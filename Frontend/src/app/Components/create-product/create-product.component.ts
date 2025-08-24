import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { IProduct } from '../../Models/iproduct';
import { ICategory } from '../../Models/icategory';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: ICategory[] = [];
  isLoading = false;
  isEditMode = false;
  productId: string | null = null;
  selectedMainImage: File | null = null;
  selectedSubImages: File[] = [];
  mainImagePreview: string | null = null;
  subImagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.loadCategories();
    this.checkEditMode();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: [10],
      categoryId: [''],
      brand: [''],
      discount: [0]
    });
  }

  checkEditMode() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductForEdit();
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.categories || response;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadProductForEdit() {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (response: any) => {
          const product = response.product || response;
          this.populateForm(product);
        },
        error: (error: any) => {
          console.error('Error loading product:', error);
          this.router.navigate(['/admin/dashboard']);
        }
      });
    }
  }

  populateForm(product: IProduct) {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: typeof product.categoryId === 'object' ? product.categoryId._id : product.categoryId,
      brand: product.brand || '',
      discount: product.discount || 0
    });

    if (product.mainImage?.secure_url) {
      this.mainImagePreview = product.mainImage.secure_url;
    }

    if (product.subImages && product.subImages.length > 0) {
      this.subImagePreviews = product.subImages.map((img: any) => img.secure_url);
    }
  }

  onMainImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedMainImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.mainImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubImagesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedSubImages = files;
    this.subImagePreviews = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.subImagePreviews.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removeMainImage() {
    this.selectedMainImage = null;
    this.mainImagePreview = null;
  }

  removeSubImage(index: number) {
    this.selectedSubImages.splice(index, 1);
    this.subImagePreviews.splice(index, 1);
  }


  onSubmit() {
    console.log('Form submitted!');
    console.log('Form valid:', this.productForm.valid);
    console.log('Form value:', this.productForm.value);
    
    if (!this.productForm.valid) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading = true;
    
    const formData = new FormData();
    const formValue = this.productForm.value;

    // Append form fields
    formData.append('name', formValue.name || '');
    formData.append('description', formValue.description || '');
    formData.append('price', formValue.price || '0');
    formData.append('stock', formValue.stock || '10');
    formData.append('categoryId', formValue.categoryId || '');
    formData.append('brand', formValue.brand || '');
    formData.append('discount', formValue.discount || '0');

    // Append images
    if (this.selectedMainImage) {
      formData.append('mainImage', this.selectedMainImage);
    }

    console.log('Sending data to backend...');

    const request = this.isEditMode 
      ? this.productService.updateProduct(this.productId!, formData)
      : this.productService.createProduct(formData);

    request.subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Success:', response);
        alert('Product saved successfully!');
        this.router.navigate(['/admin']);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error saving product:', error);
        alert('Error: ' + (error.error?.message || 'Failed to save product'));
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get stock() { return this.productForm.get('stock'); }
  get categoryId() { return this.productForm.get('categoryId'); }
}
