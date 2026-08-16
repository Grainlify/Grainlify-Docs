import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'For Contributors',
    to: '/docs/contributors',
    description: (
      <>
        Find issues, apply, and get your work merged. Merged pull requests
        earn shares in the Founding Contributor Pool, divided once at the end
        of the first GrainHack.
      </>
    ),
  },
  {
    title: 'For Maintainers',
    to: '/docs/maintainers',
    description: (
      <>
        List your project, review applications from contributors, and keep
        issues and pull requests in sync automatically.
      </>
    ),
  },
  {
    title: 'Technical Reference',
    // Was /docs/reference/program-escrow/circuit-breaker, describing "the
    // Soroban contract suite". That page is now in the archive: it documents
    // contracts that have no implementation, and the homepage was sending
    // every first-time reader - including anyone evaluating the project -
    // straight into them.
    to: '/docs/reference/payout-path',
    description: (
      <>
        Building on Grainlify itself? How support requests, follow review and
        identity verification actually work, and an honest account of what
        the payout path does and does not yet do.
      </>
    ),
  },
];

function Feature({title, to, description}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
