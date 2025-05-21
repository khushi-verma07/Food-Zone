import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets'; // Ensure menu_list is properly imported

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
    
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to provide you delicious taste & you can satisfy your cravings.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
            <img className={category===item.menu_name?"active":""}  src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
  