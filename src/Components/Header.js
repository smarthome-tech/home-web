import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import '../Styles/Header.css'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [basketCount, setBasketCount] = useState(0)
  const [currentLogo, setCurrentLogo] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const API_BASE_URL = "https://home-back-3lqs.onrender.com"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleBasketUpdate = (event) => {
      setBasketCount(event.detail.count)
    }

    window.addEventListener('basketUpdate', handleBasketUpdate)

    const loadBasketCount = () => {
      const basket = JSON.parse(localStorage.getItem('basket') || '[]')
      setBasketCount(basket.reduce((total, item) => total + (item.quantity || 1), 0))
    }

    loadBasketCount()

    return () => {
      window.removeEventListener('basketUpdate', handleBasketUpdate)
    }
  }, [])

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`)
        if (res.ok) {
          const data = await res.json()
          setCurrentLogo(data.settings?.logo || "")
        }
      } catch (err) {
        console.error("Error loading logo:", err)
      }
    }
    loadLogo()
  }, [])

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleSidebarHomeClick = (e) => {
    e.preventDefault()
    closeMenu()
    navigate('/')
  }

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-glow-top"></div>

        <div className="header-container">
          <div className="header-left">

            <Link to="/" className="logo" onClick={handleLogoClick}>
              {currentLogo && (
                <img
                  src={currentLogo}
                  alt="Logo"
                  className="logo-image"
                />
              )}
            </Link>
          </div>

          <nav className="nav desktop-nav">
            <Link
              to="/"
              onClick={handleHomeClick}
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-text">მთავარი</span>
              <span className="nav-indicator"></span>
            </Link>
            <Link
              to="/products"
              className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            >
              <span className="nav-text">პროდუქტები</span>
              <span className="nav-indicator"></span>
            </Link>
            <Link
              to="/services"
              className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
            >
              <span className="nav-text">სერვისები</span>
              <span className="nav-indicator"></span>
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              <span className="nav-text">ჩვენს შესახებ</span>
              <span className="nav-indicator"></span>
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              <span className="nav-text">კონტაქტი</span>
              <span className="nav-indicator"></span>
            </Link>
          </nav>

          <div className="header-right">
            <div className="status-line"></div>

            <Link to="/basket" className="basket-link">
              <div className="basket-icon-wrapper">
                <span className="basket-label">კალათა</span>

                <svg
                  className="basket-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {basketCount > 0 && (
                  <span className="basket-count2">{basketCount}</span>
                )}
              </div>
            </Link>

            <div className="live-indicator">
              <span className="live-dot"></span>
            </div>
            <button
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
          </div>
        </div>

        <div className="header-bottom-line">
          <div className="line-segment"></div>
          <div className="line-glow"></div>
          <div className="line-segment"></div>
        </div>
      </header>

      <Menu
        right
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        customBurgerIcon={false}
        customCrossIcon={false}
        width={'300px'}
        styles={{
          bmOverlay: {
            background: 'rgba(4, 17, 22, 0.6)',
            backdropFilter: 'blur(4px)',
          },
          bmMenuWrap: {
            position: 'fixed',
            height: '100%',
            top: 0,
          },
          bmMenu: {
            background: '#ffffff',
            padding: '0',
            fontSize: '1.15em',
          },
        }}
      >
        <div className="sidebar-header">
          <button
            className="sidebar-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span className="close-line"></span>
            <span className="close-line"></span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/"
            className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleSidebarHomeClick}
          >
            <span className="sidebar-link-text">მთავარი</span>
            <span className="sidebar-link-arrow">→</span>
          </Link>
          <Link
            to="/products"
            className={`sidebar-link ${location.pathname === '/products' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="sidebar-link-text">პროდუქტები</span>
            <span className="sidebar-link-arrow">→</span>
          </Link>
          <Link
            to="/services"
            className={`sidebar-link ${location.pathname === '/services' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="sidebar-link-text">სერვისები</span>
            <span className="sidebar-link-arrow">→</span>
          </Link>
          <Link
            to="/about"
            className={`sidebar-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="sidebar-link-text">ჩვენს შესახებ</span>
            <span className="sidebar-link-arrow">→</span>
          </Link>
          <Link
            to="/contact"
            className={`sidebar-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="sidebar-link-text">კონტაქტი</span>
            <span className="sidebar-link-arrow">→</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-status">
            <span className="sidebar-status-dot"></span>
            <span className="sidebar-status-text">ONLINE</span>
          </div>
        </div>
      </Menu>
    </>
  )
}

export default Header