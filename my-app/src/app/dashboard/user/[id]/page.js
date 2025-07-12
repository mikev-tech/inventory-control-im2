import Card from '../../components/Card'
import Products from '../../components/TopProducts'
import Invoice from '../../components/Invoice'
import styles from './user.module.css'

const Page = () => {
    return (
      <div>
        <h1 style={{fontSize: '26px', fontWeight: 'bold', color: 'black', marginLeft: '80px'}}>Inventory Analytics</h1>
        <div className={styles.content}>
          <Card type='stockitem' description='Low Stock Items' />
          <Card type='sales' description='Total Sales this Month' />
        </div>
        <Products />
        <Invoice />
      </div>
    );
};

export default Page;
