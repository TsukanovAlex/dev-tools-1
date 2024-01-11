import { it, describe, expect } from '@jest/globals';
import { shuffle } from '../script/components/option-component';

describe('Тестируем функцию перемешивания массива', () => {
    it('проверяем что количество элементов не изменилось', () => {
        //Подготовка
        const userArray = ['item1', 'item2', 'item3', 'item4'];
        const expected = userArray.length;
        //Действие
        const nArray = shuffle(userArray);
        //Сверка
        expect(nArray).toHaveLength(expected);
    });

    it('проверяем что элементы те-же самые, что и в исходном массиве', () => {
        //Подготовка
        const userArray = ['item1', 'item2', 'item3', 'item4', 'item5'];
        //Действие
        const nArray = shuffle(userArray);
        //Сверка
        expect(nArray).toEqual(expect.arrayContaining(userArray));
    });
});