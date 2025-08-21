import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useCardsStore = defineStore('cards', () => {
  const cardsData = reactive([]);
  const cards = computed(() => cardsData.sort((a, b) => b.addedDate - a.addedDate));

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cards');

      response.data.forEach( data => {
        const dataExists = cardsData.find( card => card.id === data.id);

        if (!dataExists) {
          data.addedDate = new Date(data.addedDate);
          cardsData.push(data);
        }
      });
    } catch (error) {
      console.log('Failed to fetch data');
    }
  }

  const addCards = (card) => {
    const id = cardsData.length + 1;
    cardsData.push({ ...card, id });    
  }

  const updateCard = (card) => {
    cardsData.map(item => {
      if (item.id === card.id) {
        item.code = card.code;
        item.addedDate = card.addedDate;
      }
    });
  }

  const deleteCard = (card) => {
    cardsData.splice(cardsData.findIndex(item => item.id === card.id), 1)
  }

  return { cardsData, cards, fetchCards, addCards, updateCard, deleteCard };
});