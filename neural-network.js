// Combined Neural Network Visualization for AI Engineer Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize both visualizations
    initNeuralNetworkVisualization();
    initNavbarNeurons();
    
    // Add scroll event listener to handle navbar background
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        // Add 'scrolled' class when scrolled down, remove when at top
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Main Neural Network Visualization
function initNeuralNetworkVisualization() {
    const canvas = document.getElementById('neural-network');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const containerWidth = canvas.parentElement.offsetWidth;
    const containerHeight = canvas.parentElement.offsetHeight;
    
    // Set canvas dimensions to match container for proper scaling
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    // Neural network parameters
    const layers = [
        { nodeCount: 12, name: 'input' },
        { nodeCount: 8, name: 'hidden1' },
        { nodeCount: 6, name: 'hidden2' },
        { nodeCount: 4, name: 'output' }
    ];
    const nodes = [];
    const connections = [];
    const activeConnections = [];
    
    // Colors
    const nodeInactiveColor = 'rgba(255, 255, 255, 0.3)';
    const nodeActiveColor = 'rgba(0, 184, 255, 0.8)';
    const connectionColor = 'rgba(255, 255, 255, 0.1)';
    const signalColor = 'rgba(0, 184, 255, 0.8)';
    const signalGradient = 'rgba(109, 0, 254, 0.8)';
    
    // Calculate node positions and create nodes
    function setupNodes() {
        const layerGap = containerWidth / (layers.length + 1);
        let x = layerGap;
        
        // Create nodes for each layer
        layers.forEach(layer => {
            const nodeSpacing = containerHeight / (layer.nodeCount + 1);
            let y = nodeSpacing;
            
            for (let i = 0; i < layer.nodeCount; i++) {
                nodes.push({
                    x: x,
                    y: y,
                    radius: 4,
                    layer: layer.name,
                    active: false,
                    pulseRadius: 0,
                    pulseActive: false
                });
                
                y += nodeSpacing;
            }
            
            x += layerGap;
        });
    }
    
    // Create connections between layers
    function setupConnections() {
        const layerStartIndices = [];
        let startIndex = 0;
        
        // Calculate start index of each layer in nodes array
        layers.forEach(layer => {
            layerStartIndices.push(startIndex);
            startIndex += layer.nodeCount;
        });
        
        // Connect all nodes between adjacent layers
        for (let l = 0; l < layers.length - 1; l++) {
            const currentLayerStart = layerStartIndices[l];
            const currentLayerEnd = l + 1 < layerStartIndices.length ? layerStartIndices[l + 1] : nodes.length;
            const nextLayerStart = layerStartIndices[l + 1];
            const nextLayerEnd = l + 2 < layerStartIndices.length ? layerStartIndices[l + 2] : nodes.length;
            
            // Connect each node in current layer to each node in next layer
            for (let i = currentLayerStart; i < currentLayerEnd; i++) {
                for (let j = nextLayerStart; j < nextLayerEnd; j++) {
                    connections.push({
                        from: i,
                        to: j,
                        weight: Math.random(),
                        signals: []
                    });
                }
            }
        }
    }
    
    // Draw connections between nodes
    function drawConnections() {
        connections.forEach(connection => {
            const fromNode = nodes[connection.from];
            const toNode = nodes[connection.to];
            
            // Draw base connection line
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = connectionColor;
            ctx.lineWidth = connection.weight * 2;
            ctx.stroke();
            
            // Draw signals traveling along connections
            connection.signals.forEach((signal, index) => {
                const dx = toNode.x - fromNode.x;
                const dy = toNode.y - fromNode.y;
                const x = fromNode.x + dx * signal.position;
                const y = fromNode.y + dy * signal.position;
                
                // Draw signal pulse
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, signal.radius);
                gradient.addColorStop(0, signalColor);
                gradient.addColorStop(1, signalGradient);
                
                ctx.beginPath();
                ctx.arc(x, y, signal.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Update signal position
                signal.position += signal.speed;
                
                // When signal reaches destination
                if (signal.position >= 1) {
                    // Activate destination node
                    nodes[connection.to].active = true;
                    nodes[connection.to].pulseActive = true;
                    nodes[connection.to].pulseRadius = 0;
                    
                    // Remove signal
                    connection.signals.splice(index, 1);
                    
                    // Potentially create new signals from the destination node
                    if (Math.random() < 0.7) {
                        const outgoingConnections = connections.filter(conn => conn.from === connection.to);
                        
                        if (outgoingConnections.length > 0) {
                            // Choose random outgoing connection
                            const randomConn = outgoingConnections[Math.floor(Math.random() * outgoingConnections.length)];
                            
                            // Add signal to that connection
                            randomConn.signals.push({
                                position: 0,
                                speed: 0.01 + Math.random() * 0.005,
                                radius: 2 + Math.random() * 2
                            });
                        }
                    }
                }
            });
        });
    }
    
    // Draw nodes
    function drawNodes() {
        nodes.forEach(node => {
            // Draw node background
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            // Set fill style based on node state
            if (node.active) {
                ctx.fillStyle = nodeActiveColor;
            } else {
                ctx.fillStyle = nodeInactiveColor;
            }
            
            ctx.fill();
            
            // Draw pulse effect for active nodes
            if (node.pulseActive) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 184, 255, ${Math.max(0, 1 - node.pulseRadius / 30)})`; // Fade out as radius increases
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Increase pulse radius
                node.pulseRadius += 0.5;
                
                // Deactivate pulse when it gets too big
                if (node.pulseRadius > 30) {
                    node.pulseActive = false;
                    
                    // Randomly deactivate node
                    if (Math.random() < 0.3) {
                        node.active = false;
                    }
                }
            }
        });
    }
    
    // Initialize nodes and connections
    function init() {
        setupNodes();
        setupConnections();
        
        // Activate some input nodes to start
        const inputNodes = nodes.filter(node => node.layer === 'input');
        const activateCount = Math.floor(inputNodes.length * 0.5);
        
        for (let i = 0; i < activateCount; i++) {
            const randomIndex = Math.floor(Math.random() * inputNodes.length);
            const nodeIndex = nodes.indexOf(inputNodes[randomIndex]);
            
            if (nodeIndex !== -1) {
                nodes[nodeIndex].active = true;
                nodes[nodeIndex].pulseActive = true;
                
                // Create initial signals from active input nodes
                const outgoingConnections = connections.filter(conn => conn.from === nodeIndex);
                
                if (outgoingConnections.length > 0) {
                    // Choose random outgoing connection
                    const randomConn = outgoingConnections[Math.floor(Math.random() * outgoingConnections.length)];
                    
                    // Add signal to that connection
                    randomConn.signals.push({
                        position: 0,
                        speed: 0.01 + Math.random() * 0.005,
                        radius: 2 + Math.random() * 2
                    });
                }
                
                // Remove this node from the array to avoid duplicates
                inputNodes.splice(randomIndex, 1);
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (so they appear behind nodes)
        drawConnections();
        
        // Draw nodes on top
        drawNodes();
        
        // Randomly activate an input node
        if (Math.random() < 0.02) { // 2% chance per frame
            const inputNodes = nodes.filter(node => node.layer === 'input' && !node.active);
            
            if (inputNodes.length > 0) {
                const randomNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
                const nodeIndex = nodes.indexOf(randomNode);
                
                if (nodeIndex !== -1) {
                    nodes[nodeIndex].active = true;
                    nodes[nodeIndex].pulseActive = true;
                    nodes[nodeIndex].pulseRadius = 0;
                    
                    // Create signals from this node
                    const outgoingConnections = connections.filter(conn => conn.from === nodeIndex);
                    
                    if (outgoingConnections.length > 0) {
                        // Choose 1-3 random outgoing connections
                        const numConnections = Math.floor(Math.random() * 3) + 1;
                        const shuffled = [...outgoingConnections].sort(() => 0.5 - Math.random());
                        const selectedConnections = shuffled.slice(0, numConnections);
                        
                        // Add signal to each selected connection
                        selectedConnections.forEach(conn => {
                            conn.signals.push({
                                position: 0,
                                speed: 0.01 + Math.random() * 0.005,
                                radius: 2 + Math.random() * 2
                            });
                        });
                    }
                }
            }
        }
        
        // Continue animation loop
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    function handleResize() {
        const containerWidth = canvas.parentElement.offsetWidth;
        const containerHeight = canvas.parentElement.offsetHeight;
        
        // Update canvas dimensions
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        
        // Reset and reinitialize visualization
        nodes.length = 0;
        connections.length = 0;
        init();
    }
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Start visualization
    init();
    animate();
}

// Navbar Neural Network Visualization - Full Width
function initNavbarNeurons() {
    const canvas = document.getElementById('navbar-neurons');
    if (!canvas) return;
    
    const header = document.querySelector('header');
    if (!header) return;
    
    // Position the canvas to cover the entire navbar/header
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = header.offsetWidth;
    const height = canvas.height = header.offsetHeight;
    
    // Smaller neural network for navbar
    const nodes = [];
    const connections = [];
    
    // Create nodes across the full width of navbar
    const nodeCount = 20; // Increased node count for better coverage
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.5 + Math.random() * 1.5, // Slightly larger nodes
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            active: Math.random() > 0.5 // More active nodes
        });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            // Create more connections for better visibility
            if (Math.random() > 0.5) {
                connections.push({
                    from: i,
                    to: j,
                    opacity: 0.2 + Math.random() * 0.4 // Higher opacity
                });
            }
        }
    }
    
    function draw() {
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        connections.forEach(connection => {
            const fromNode = nodes[connection.from];
            const toNode = nodes[connection.to];
            
            // Calculate distance between nodes
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only draw if nodes are close enough
            if (distance < 60) { // Increased distance threshold
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                
                // Line opacity based on distance
                const opacity = connection.opacity * (1 - distance / 60);
                
                // Gradient color for connections
                if (fromNode.active && toNode.active) {
                    ctx.strokeStyle = `rgba(0, 184, 255, ${opacity * 1.2})`; // Brighter if both nodes active
                } else {
                    ctx.strokeStyle = `rgba(109, 0, 254, ${opacity})`; // Purple tint otherwise
                }
                
                ctx.lineWidth = 0.7; // Slightly thicker lines
                ctx.stroke();
            }
        });
        
        // Draw and update nodes
        nodes.forEach(node => {
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            // Color based on active state
            if (node.active) {
                // Gradient fill for active nodes
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * 2
                );
                gradient.addColorStop(0, 'rgba(0, 184, 255, 0.9)');
                gradient.addColorStop(1, 'rgba(109, 0, 254, 0.6)');
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            }
            
            ctx.fill();
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < node.radius || node.x > width - node.radius) {
                node.vx = -node.vx;
            }
            
            if (node.y < node.radius || node.y > height - node.radius) {
                node.vy = -node.vy;
            }
            
            // Randomly change active state
            if (Math.random() < 0.01) {
                node.active = !node.active;
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    // Start animation
    draw();
    
    // Handle window resize for navbar neurons
    window.addEventListener('resize', function() {
        // Update canvas dimensions to match header size
        const width = canvas.width = header.offsetWidth;
        const height = canvas.height = header.offsetHeight;
        
        // Reposition nodes across the full width of the navbar
        nodes.forEach(node => {
            node.x = Math.random() * width;
            node.y = Math.random() * height;
        });
    });
}