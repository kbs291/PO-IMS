import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCardsStore = defineStore('cards', () => {
  const cards = reactive([]);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cards');

      response.data.forEach( data => {
        const dataExists = cards.find( card => card.id === data.id);

        if (!dataExists) {
          data.addedDate = new Date(data.addedDate);
          cards.push(data);
        }
      });
    } catch (error) {
      console.log('Failed to fetch data');
    }
  }

  const addCards = (card) => {
    const id = cards.length + 1;
    cards.push({ ...card, id });    
  }

  return { cards, fetchCards, addCards };
});