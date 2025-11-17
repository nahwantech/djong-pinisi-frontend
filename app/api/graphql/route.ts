import { NextRequest, NextResponse } from 'next/server';

// Mock suggestions data
const mockSuggestions = [
    'Beautiful sunset tour',
    'Cultural heritage experience',
    'Adventure island hopping',
    'Traditional cuisine tasting',
    'Wildlife observation tour',
    'Romantic dinner cruise',
    'Historical landmark visit',
    'Snorkeling adventure',
    'Mountain hiking expedition',
    'Local market exploration'
];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { query, variables } = body;

        // Simple mock GraphQL resolver
        if (query.includes('GetSuggestions')) {
            const searchQuery = variables?.query?.toLowerCase() || '';
            
            // Filter suggestions based on the input
            const filteredSuggestions = mockSuggestions
                .filter(suggestion => 
                    searchQuery.length > 1 && 
                    suggestion.toLowerCase().includes(searchQuery.replace(';', '').trim())
                )
                .slice(0, 5); // Limit to 5 suggestions

            return NextResponse.json({
                data: {
                    suggestions: filteredSuggestions.map((text, id) => ({ id, text }))
                }
            });
        }

        return NextResponse.json({
            data: {
                suggestions: []
            }
        });

    } catch (error) {
        console.error('GraphQL API Error:', error);
        return NextResponse.json(
            { 
                errors: [{ message: 'Internal server error' }] 
            },
            { status: 500 }
        );
    }
}