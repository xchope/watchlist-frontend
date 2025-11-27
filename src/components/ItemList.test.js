import { render, screen, fireEvent } from '@testing-library/vue'
import ItemList from './ItemList.vue'

test('displays watchlist items', async () => {
    const items = [
        { id: 1, title: 'The Matrix' },
        { id: 2, title: 'Breaking Bad' }
    ]

    render(ItemList, {
        props: { items }
    })

    // Prüft, ob beide Titel auf der Seite angezeigt werden
    expect(screen.getByText('The Matrix')).toBeInTheDocument()
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument()
})

test('creates a new watchlist item', async () => {
    const { getByText, getByPlaceholderText } = render(ItemList)

    const input = getByPlaceholderText('Neuen Eintrag eingeben')
    const button = getByText('Speichern')

    await fireEvent.update(input, 'Inception')
    await fireEvent.click(button)

    expect(getByText('Inception')).toBeInTheDocument()
})
