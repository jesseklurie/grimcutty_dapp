import './Tokenomics.css'

// Import the CSS file for styling

const Tokenomics = () => {
  const totalSupply = 666666
  const chosenOnes = (totalSupply * 0.95).toLocaleString() // 95% for holders
  const developerShare = (totalSupply * 0.05).toLocaleString() // 5% for developer

  return (
    <div className="tokenomics">
      <h2 className="tokenomics-title">Grimcutty Coin Tokenomics</h2>
      <div className="tokenomics-details">
        <div className="tokenomics-item">
          <h3>Total Supply</h3>
          <p>{totalSupply.toLocaleString()} Coins</p>
        </div>
        <div className="tokenomics-item">
          <h3>Chosen Ones</h3>
          <p>{chosenOnes} Coins (95%) - The Summoners of Grimcutty</p>
        </div>
        <div className="tokenomics-item">
          <h3>Developers Share</h3>
          <p>{developerShare} Coins (5%) - The Creator</p>
        </div>
      </div>
      {/* <div className="tokenomics-legend">
        <h3>Incentives for Holders</h3>
        <ul>
          <li><strong>Summoning Ritual:</strong> As a chosen one, you unlock the ancient ability to summon Grimcutty during special events, unleashing his powers for a chance to gain exclusive rewards.</li>
          <li><strong>Veil of Protection:</strong> Holding the coin creates an invisible shield, granting you immunity from Grimcutty's haunting during your darkest nights.</li>
          <li><strong>Cinematic Experience:</strong> Access to exclusive virtual screenings of horror films featuring Grimcutty, where you can witness the chilling moments that inspired the coin.</li>
          <li><strong>Fear Confrontation Trials:</strong> Participate in immersive challenges where you face your fears head-on, earning rewards and unlocking unique lore about Grimcutty’s origins.</li>
          <li><strong>Influence the Script:</strong> As a holder, your choices can shape future narratives and twists in the Grimcutty saga, making you a pivotal character in the unfolding horror story.</li>
        </ul>
      </div> */}
    </div>
  )
}

export default Tokenomics
