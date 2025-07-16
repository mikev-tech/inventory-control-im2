import Card from '../../components/Card';
import Products from '../../components/TopProducts';
import Invoice from '../../components/Invoice';
import styles from './user.module.css';

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inventory Analytics</h1>

      <div className={styles.content}>
        <Card type="stockitem" description="Low Stock Items" />
        <Card type="sales" description="Total Sales" />
      </div>

      <div className={styles.gridSection}>
        <Products />
      </div>

      <div className={styles.gridSection}>
        <Invoice />
      </div>
    </div>
  );
};

export default Page;
