import React from 'react'
import styles from './card.module.css';

const Card = ({type, description}) => {
    if (type === 'stockitem'){
        return (
            <div className={styles.stockitems}>
                <h1 style={{fontSize: '26px'}}>
                    1
                </h1>
                <div style={{marginTop: '60px', backgroundColor: '#b85547ff', width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <p>{description}</p>
                </div>
            </div>
        )
    } else if (type === 'sales'){
        return (
            <div className={styles.sales}>
                <h1 style={{fontSize: '26px'}}>
                    P19564.00
                </h1>
                    <div style={{marginTop: '60px', backgroundColor: '#556d52ff', width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <p>{description}</p>
                    </div>
            </div>
        )
    }
}

export default Card
