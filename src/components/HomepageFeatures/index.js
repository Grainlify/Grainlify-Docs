import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Earn Points & Rewards',
    to: '/docs/features/referrals',
    description: (
      <>
        Invite friends, follow us on social, and turn what you earn into
        real USDC. See what you get and how to claim it.
      </>
    ),
  },
  {
    title: 'Stay in the Loop',
    to: '/docs/features/notifications',
    description: (
      <>
        Know the moment an issue is assigned to you, a PR merges, or a
        reward lands — and control exactly what you hear about.
      </>
    ),
  },
  {
    title: 'Technical Reference',
    to: '/docs/program-escrow/circuit-breaker',
    description: (
      <>
        Building on Grainlify? Smart contract internals, event schemas, and
        architecture notes for the Soroban contract suite.
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
