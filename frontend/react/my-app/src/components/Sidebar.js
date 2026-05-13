import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { id: 1, name: '홈', icon: '📊', path: '/'},
        { id: 2, name: 'AI 코드분석', icon: '🤖', path: '/aicode'},
        { id: 3, name: '설정', icon: '⚙️', path: '/settings'},
    ];

    return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
        {isOpen ? '◀' : '▶'}
      </button>

    <nav className="menu-list">
        {menuItems.map((item) => (
          <NavLink  key={item.id} to={item.path} className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
            <span className="icon">{item.icon}</span>
            {isOpen && <span className="text">{item.name}</span>}
          </NavLink >
        ))}
      </nav>
    </div>
    );
};

export default Sidebar;