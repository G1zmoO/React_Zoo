import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as WhatsappIcon } from '../../assets/icons/whatsapp.svg';
import styles from './Footer.module.css';

const CONTACT_INFO = [
  { label: 'Phone', value: '+49 30 915-88492' },
  { label: 'Address', value: 'Wallstraße 9-13, 10179 Berlin, Deutschland' },
  { label: 'Working Hours', value: '24 hours a day' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/itcareerhub/', Icon: InstagramIcon },
  { label: 'WhatsApp', href: 'https://wa.me/493091588492', Icon: WhatsappIcon },
];

const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Wallstra%C3%9Fe+9-13,+10179+Berlin,+Deutschland&output=embed';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>Contact</h2>

      <div className={styles.cards}>
        <div className={styles.row}>
          <div className={styles.card}>
            <p className={styles.label}>{CONTACT_INFO[0].label}</p>
            <p className={styles.value}>{CONTACT_INFO[0].value}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Socials</p>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialLink}
                >
                  <Icon className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.card}>
            <p className={styles.label}>{CONTACT_INFO[1].label}</p>
            <p className={styles.value}>{CONTACT_INFO[1].value}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>{CONTACT_INFO[2].label}</p>
            <p className={styles.value}>{CONTACT_INFO[2].value}</p>
          </div>
        </div>

        <iframe
          className={styles.map}
          src={MAP_EMBED_URL}
          title="Store location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
};

export default Footer;
