import { useState, useRef } from 'react';
import { Card, CardBody  } from '@nextui-org/react';
import { motion } from 'framer-motion';


// Example GraphQL fetcher query with error handling
async function fetchSuggestions(query) {
    try {
        const res = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query GetSuggestions($query: String!) {
                        suggestions(query: $query) {
                            id
                            text
                        }
                    }
                `,
                variables: { query },
            }),
        });

        // Check if response is OK
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const json = await res.json();
        return json.data?.suggestions || [];
    } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        return [];
    }
}

export default function TextAreaTooltip() {

    const [value, setValue] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // Detect semicolon and fetch suggestions
    const handleChange = async (e) => {
        const text = e.target.value;
        setValue(text);

        if (text.endsWith(";")) {
            const rect = inputRef.current.getBoundingClientRect();
            setPosition({ x: rect.left + 10, y: rect.top - 10 });
            setShowTooltip(true);
            setLoading(true);

            try {
                const data = await fetchSuggestions(text);
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        } else {
            setShowTooltip(false);
            setSuggestions([]);
        }
    };

    const handleSelect = (suggestion) => {
        // Replace the semicolon trigger with the selected suggestion
        const newValue = value.slice(0, -1) + ' ' + suggestion.text;
        setValue(newValue);
        setShowTooltip(false);
        setSuggestions([]);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto mt-10">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                className="w-full border rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type something; to trigger suggestions"
            />

            {showTooltip && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute z-50"
                    style={{ left: position.x, top: position.y }}
                >
                    <Card className="rounded-2xl shadow-xl bg-white border p-2 w-64">
                    <CardBody className="space-y-1">
                        {loading && (
                            <div className="text-sm text-gray-500 p-2">Loading suggestions...</div>
                        )}
                        {!loading && suggestions.length === 0 && (
                            <div className="text-sm text-gray-500 p-2">No suggestions found</div>
                        )}
                        {!loading && suggestions.map((suggestion) => (
                            <div
                                key={suggestion.id}
                                onClick={() => handleSelect(suggestion)}
                                className="cursor-pointer p-2 rounded-xl hover:bg-gray-100 text-sm transition-colors"
                                >
                                {suggestion.text}
                            </div>
                        ))}
                    </CardBody>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
