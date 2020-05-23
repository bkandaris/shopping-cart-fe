import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';
import AllProducts from './AllProducts';
import StoreNav from './StoreNav';

function StoreView(props) {
	const sellerId = props.match.params.id.split('-').pop();
	const cartContents = useSelector((state) => state.cart);
	const store = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(creators.getProducts(sellerId));
			dispatch(creators.getStore(sellerId));
			dispatch(creators.setStoreUrl(window.location.href));
		},
		[ sellerId, dispatch ]
	);
	const inventory = useSelector((state) => state.store);
	const storeDetails = store.user;
	const searchString = useSelector((state) => state.search);

	console.log('🍕', storeDetails);

	// SearchObj is what parases the string (no idea how it works)
	function searchObj(obj, string) {
		const regExpFlags = 'gi';
		const regExp = new RegExp(string, regExpFlags);
		return JSON.stringify(obj).match(regExp);
	}
	// SearchFilter is leveraged with SearchObj to find the product
	const searchFilter = inventory.filter(function(obj) {
		return searchObj(obj, searchString);
	});

	return (
		<div>
			<div>
				<StoreNav storeDetails={storeDetails} />
				<AllProducts searchString={searchString} searchFilter={searchFilter} inventory={inventory} />
			</div>
		</div>
	);
}

export default StoreView;
