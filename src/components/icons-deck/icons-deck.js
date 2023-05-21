import React from 'react'
import styles from './icons-deck.module.css'

export function IconsDeck({ icons }) {

  const iconsToRender = React.useMemo(() => {
    return icons.slice(0, 6)
  }, [icons])

  const hiddenIngredientsCount = React.useMemo(() => {
    return icons.length - iconsToRender.length >= 0 ? icons.length - iconsToRender.length : -1
  }, [icons, iconsToRender])


  return (
    <div className={styles.iconsContainer}>
      {hiddenIngredientsCount <= 0 ? iconsToRender.map((icon, index) => (
        <div style={{ zIndex: icons.length - index }} className={styles.gradientBackground} key={index}>
          <div className={styles.iconContainer}>
            <img src={icon.image} alt={icon.name} />
          </div>
        </div>)
      ) :
        iconsToRender.map((icon, index) => {
          return index !== iconsToRender.length - 1 ? (
            <div style={{ zIndex: icons.length - index }} className={styles.gradientBackground} key={index}>
              <div className={styles.iconContainer}>
                <img src={icon.image} alt={icon.name} />
              </div>
            </div>
          ) : (
            <div style={{ zIndex: icons.length - index }} className={styles.gradientBackground} key={index}>
              <div className={styles.iconContainer} style={{ backgroundImage: `url(${icon.image})`, backgroundPosition: 'center', backgroundSize: '170%' }}>
                <div className={styles.hiddenItemsContainer}>
                  <p className={`text text_type_main-small`}>+{hiddenIngredientsCount}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div >
  )
}
