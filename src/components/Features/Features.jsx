function Features() {
  const features = [
    {
      number: '01',
      icon: '✦',
      title: 'AI Career Guidance',
      description:
        'Get personalized career recommendations based on your interests, skills, and goals.',
    },
    {
      number: '02',
      icon: '↗',
      title: 'Personalized Learning',
      description:
        'Follow an AI-generated learning roadmap designed specifically for your career journey.',
    },
    {
      number: '03',
      icon: '◈',
      title: 'Track Your Progress',
      description:
        'Monitor your skills, learning progress, and career readiness from one dashboard.',
    },
  ]

  return (
    <section id="features" className="features-section">
      <div className="section-heading">
        <p>WHY SKILLBRIDGE?</p>

        <h2>
          Everything you need
          <br />
          <span>to grow with confidence.</span>
        </h2>

        <div className="features-heading-line" />
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.number}>
            <div className="feature-card-top">
              <div className="feature-icon">
                {feature.icon}
              </div>

              <span className="feature-number">
                {feature.number}
              </span>
            </div>

            <div className="feature-card-content">
              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>

            <div className="feature-card-arrow">
              →
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features