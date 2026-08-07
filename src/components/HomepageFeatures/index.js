import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Platform Features',
    description: (
      <>
        How referrals, notifications, the social-follow program, and USDC
        redemptions actually work under the hood.
      </>
    ),
  },
  {
    title: 'Smart Contracts',
    description: (
      <>
        Bounty escrow, program escrow, and the rest of the Soroban contract
        suite — event schemas, fee arithmetic, security model.
      </>
    ),
  },
  {
    title: 'Reference',
    description: (
      <>
        ABI stability, database schema, serialization formats, and gas
        optimization notes for contributors working across the stack.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
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
