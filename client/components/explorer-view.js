import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { kmeans } from 'ml-kmeans';
import * as THREE from 'three';

export default function ExplorerView({ entries }) {
  const [embeddings, setEmbeddings] = useState([]);
  const [model, setModel] = useState(null);
  const [hoveredEntry, setHoveredEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await use.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (model && entries.length > 0) {
      const generateEmbeddings = async () => {
        setIsLoading(true);
        const titles = entries.map(entry => entry.title);
        const embeddings = await model.embed(titles);
        const embeddingsArray = await embeddings.array();
        setEmbeddings(embeddingsArray);
        setIsLoading(false);
      };
      generateEmbeddings();
    }
  }, [model, entries]);

  const scaleEmbeddings = (embeddings) => {
    const xValues = embeddings.map(e => e[0]);
    const yValues = embeddings.map(e => e[1]);
    const zValues = embeddings.map(e => e[2]);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const zMin = Math.min(...zValues);
    const zMax = Math.max(...zValues);

    return embeddings.map(e => [
      (e[0] - xMin) / (xMax - xMin) * 10,
      (e[1] - yMin) / (yMax - yMin) * 10,
      (e[2] - zMin) / (zMax - zMin) * 10
    ]);
  };

  const { scaledEmbeddings, clusters } = useMemo(() => {
    if (embeddings.length === 0) return { scaledEmbeddings: [], clusters: [] };

    const scaled = scaleEmbeddings(embeddings);
    const { clusters } = kmeans(scaled, 5); // 5 clusters, adjust as needed

    return { scaledEmbeddings: scaled, clusters };
  }, [embeddings]);

  const clusterColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {scaledEmbeddings.map((embedding, index) => (
          <mesh
            key={index}
            position={new THREE.Vector3(...embedding)}
            onPointerOver={(e) => setHoveredEntry(entries[index])}
            onPointerOut={() => setHoveredEntry(null)}
            onClick={() => window.open(entries[index].url.replace(/pdf(?=.)/, "abs").replace(/v\d+$/, ""), "_blank")}
          >
            <sphereGeometry args={[0.1 + embedding[2] / 100, 32, 32]} />
            <meshStandardMaterial color={clusterColors[clusters[index]]} />
          </mesh>
        ))}
        {hoveredEntry && (
          <Html position={[-5, 5, 0]}>
            <div style={{ color: 'black', backgroundColor: 'white', padding: '5px', borderRadius: '3px' }}>
              <strong>{hoveredEntry.title}</strong>
              <br />
              {new Date(hoveredEntry.notion_timestamp).toLocaleDateString()}
            </div>
          </Html>
        )}
      </Canvas>
    </div>
  );
}
