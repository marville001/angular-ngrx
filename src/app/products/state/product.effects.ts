import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";

import * as ProductActions from "./product.actions"

@Injectable()
export class ProductEffects {

	constructor(private action$: Actions, private productService: ProductService) { }

	loadProduct$ = createEffect(() => {
		return this.action$.pipe(
			ofType(ProductActions.loadProducts),
			mergeMap(() => this.productService.getProducts().pipe(
				map(products => ProductActions.loadProductsSuccess({ products })),
				catchError(error=>of(ProductActions.loadProductsFailure({error})))
			))
		)
	})

	updateProduct$ = createEffect(() => {
		return this.action$.pipe(
			ofType(ProductActions.updateProduct),
			concatMap(action => this.productService.updateProduct(action.product).pipe(
				map(product => ProductActions.updateProductSuccess({ product })),
				catchError(error=>of(ProductActions.updateProductFailure({error})))
			))
		)
	})

	createProduct$ = createEffect(() => {
		return this.action$.pipe(
			ofType(ProductActions.createProduct),
			concatMap(action => this.productService.createProduct(action.product).pipe(
				map(product => ProductActions.createProductSuccess({ product })),
				catchError(error=>of(ProductActions.createProductFailure({error})))
			))
		)
	})

	deleteProduct$ = createEffect(() => {
		return this.action$.pipe(
			ofType(ProductActions.deleteProduct),
			concatMap(action => this.productService.deleteProduct(action.productId).pipe(
				map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
				catchError(error=>of(ProductActions.deleteProductFailure({error})))
			))
		)
	})

}
