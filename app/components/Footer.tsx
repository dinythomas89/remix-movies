import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className="bg-footer p-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
          </div>
          {/*<button className={styles.button}>Click me</button>*/}
        </footer>
    );
}
  