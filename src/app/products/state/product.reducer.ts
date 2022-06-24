import { createReducer, on } from "@ngrx/store";
import { Product } from "../product"
import * as ProductActions from "./product.actions";

export interface ProductState {
	showProductCode: boolean;
	currentProductId: number | null;
	products: Product[],
	error: string
}

const initialState: ProductState = {
	showProductCode: true,
	currentProductId: null,
	products: [],
	error: ''
}

export const productReducer = createReducer<ProductState>(
	initialState,
	on(ProductActions.toggleProductCode, (state): ProductState => {
		return {
			...state,
			showProductCode: !state.showProductCode
		}
	}),

	on(ProductActions.setCurrentProduct, (state, action): ProductState => {
		return {
			...state,
			currentProductId: action.currentProductId
		}
	}),

	on(ProductActions.clearCurrentProduct, (state): ProductState => {
		return {
			...state,
			currentProductId: null
		}
	}),

	on(ProductActions.initializeCurrentProduct, (state): ProductState => {
		return {
			...state,
			currentProductId: 0
		}
	}),

	on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
		return {
			...state,
			products: action.products,
			error: ''
		}
	}),

	on(ProductActions.loadProductsFailure, (state, action): ProductState => {
		return {
			...state,
			products: [],
			error: action.error
		}
	}),

	on(ProductActions.updateProductSuccess, (state, action): ProductState => {
		const updatedProducts = state.products.map(
			item => action.product.id === item.id ? action.product : item
		)

		return {
			...state,
			products: updatedProducts,
			currentProductId: action.product.id,
			error: ''
		}
	}),

	on(ProductActions.createProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: [...state.products, action.product],
			error: '',
		}
	}),

	on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
		const updatedProducts = state.products.filter(
			item => action.productId !== item.id
		)
		return {
			...state,
			products: updatedProducts,
			currentProductId: null,
			error: '',
		}
	}),

	on(
		ProductActions.updateProductFailure,
		ProductActions.createProductFailure,
		ProductActions.deleteProductFailure,
		(state, action): ProductState => {
			return {
				...state,
				error: action.error
			}
		}),

)