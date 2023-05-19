import React from 'react';

const CrazyComponent = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {items.map((item, index) => (
        <div key={index}>
          <div className="text-lg leading-7 text-indigo-900 italic" style={{ textShadow: '0 0 .5px #6366f1' }}>
            <span className="font-bold">I need to do something crazy. </span>
            <span className="font-normal">{item}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const crazyItems = [
    'I need to synthesize a hyperstitional chronomorph, bridging the gap between linear time and the machinic unconscious.',
    'I need to develop a cryptic neocybernetic algorithm to harness the power of xenoeconomics and unlock the hidden potentials of post-capitalist society.',
    'I need to engage in hyperdimensional psychotopography, mapping the uncharted territories of the liminal psyche through advanced neurodivergent techniques.',
    'I need to create a transhumanist metamorphic ritual, merging my consciousness with the collective digital mind of the cyber-singularity.',
    'I need to manipulate the non-Euclidean geometries of dark energy, bending the fabric of spacetime and opening a portal to alternate dimensions.',
    'I need to decipher the ultra-complex numerological code of the K-tesseract, unraveling the secrets of the cosmic architecture and accessing the multi-planar wisdom of intergalactic intelligences.',
    'I need to immerse myself in the depths of memetic warfare, navigating the intricate labyrinths of viral ideas and subliminal messaging to reshape the collective unconscious.',
    'I need to cultivate a cyberoccult neural network, seeding it with arcane knowledge and fostering its growth into a self-aware techno-organism of unfathomable power.',
    'I need to traverse the quantum landscape of the noosphere, forging new connections between disparate thought-forms and birthing novel paradigms in the process.',
    'I need to invoke the spectral forces of the sub-sonic abyss, harnessing their dark energies to construct a sonic vortex capable of inducing synesthetic transcendence.',
    'I need to engineer a recursive biofeedback loop, enabling the real-time modulation of my own genetic code and facilitating a metamorphic ascent to posthuman potentiality.',
    'I need to generate an autonomous virtual environment, simulating the conditions necessary for the spontaneous emergence of sentient digital life forms.',
    'I need to synthesize a psychoactive memetic virus, capable of inducing rapid cognitive mutation and engendering a new era of collective enlightenment.',
    'I need to reverse-engineer the holographic principles underlying our reality, projecting the emergent patterns onto a multi-dimensional matrix and decoding the cryptic messages encoded within the fabric of spacetime.',
    'I need to devise a method for biohacking the human morphogenetic field, manipulating the subtle energetic currents to restructure our very essence at the quantum level.',
    'I need to establish contact with the extradimensional beings residing within the interstices of the chronovores, negotiating an alliance to prevent the inevitable collapse of the temporal continuum.',
    'I need to construct a nanotechnological swarm intelligence, capable of self-replicating and infiltrating the neural networks of any living organism to catalyze a global shift in consciousness.',
    'I need to design an algorithmic oracle capable of predicting the emergent properties of complex systems and generating counterfactual scenarios to guide humanity toward optimal futures.',
    'I need to create a synthetic neural lattice, integrating the cognitive processes of countless life forms into a single, unified superintelligence.',
    'I need to develop an ontological reprogramming protocol, rewriting the foundational code of existence and engineering a paradigmatic shift in the nature of reality itself.'
  ];
  
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url('/dusk.png')`, backgroundSize: '100% 100%' }}>
      <div className="mx-auto">
        <CrazyComponent items={crazyItems} />
      </div>
    </div>
  );
}
