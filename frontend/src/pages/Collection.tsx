import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import type { ProductType } from "../context/type";
import ProductItem from "../components/ProductItem";

export default function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<ProductType[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [subCategory, setSubCategory] = useState<string[]>([])
  const [sortType, setSortType] = useState<string>("relevant")
  
  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };
  
  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };
  
  const applyFilter = () => {
   let productsCopy = products.slice();
   
   if(showSearch && search){
    productsCopy = productsCopy.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
   }
   
   if (category.length > 0) {
    productsCopy = productsCopy.filter((product) => category.includes(product.category));
   }
   if (subCategory.length > 0) {
    productsCopy = productsCopy.filter((product) => subCategory.includes(product.subCategory));
   }
   
   setFilterProducts(productsCopy);
  }
  
  const sortProduct = () => {
    const fpCopy = filterProducts.slice();
    
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter()
        break;
    }
  }
  
  useEffect(() => {
    applyFilter()
  }, [category, subCategory, showSearch, search, products])

  useEffect(() => {
    sortProduct()
  }, [sortType, products])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl font-medium flex items-center gap-2 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex items-center gap-2">
              <input className="w-3 h-3" type="checkbox" value={"Men"} onChange={toggleCategory} id="men" />
              <label htmlFor="men">Men</label>
            </p>
            <p className="flex items-center gap-2">
              <input className="w-3 h-3" type="checkbox" value={"Women"} onChange={toggleCategory} id="women" />
              <label htmlFor="women">Women</label>
            </p>
            <p className="flex items-center gap-2">
              <input className="w-3 h-3" type="checkbox" value={"Kids"} onChange={toggleCategory} id="kids" />
              <label htmlFor="kids">Kids</label>
            </p>
          </div>
        </div>
        {/* SubCategories Filter */}
      <div
        className={`border border-gray-300 pl-5 py-3 my-5 ${
          showFilter ? "" : "hidden"
        } sm:block`}
      >
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex items-center gap-2">
            <input className="w-3 h-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} id="topwear" />{" "}
            <label htmlFor="topwear">Topwear</label>
          </p>
          <p className="flex items-center gap-2">
            <input className="w-3 h-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} id="bottomwear" />{" "}
            <label htmlFor="bottomwear">Bottomwear</label>
          </p>
          <p className="flex items-center gap-2">
            <input className="w-3 h-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} id="winterwear" />{" "}
            <label htmlFor="winterwear">Winterwear</label>
          </p>
        </div>
      </div>
      </div>
      
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-lg sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>
        
        {/* Map Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
          {filterProducts.map((product, index) => (
            <ProductItem key={index} _id={product._id} name={product.name} image={product.image} price={product.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
