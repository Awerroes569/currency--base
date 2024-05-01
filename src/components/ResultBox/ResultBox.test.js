
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';



describe('Component ResultBox', () => {
    
    it('should render without crashing', () => {
        render(<ResultBox from= {'USD'} to={ 'PLN'}  amount= {100}  />);}
    );

    it('should render proper info about conversion when PLN -> USD', () => {
        
        const amounts= [15, 33, 76, 100, 186, 272, 397, 555, 1021, 2000];

        const afterConversion = amounts.map((amount)=>(Math.max(amount / 3.5, 0)));
        
        for (let i = 0; i < amounts.length; i++) {
            // render component
            render(<ResultBox from= {'PLN'} to={ 'USD'}  amount= {amounts[i]}  />);
            // find result element
            const result = screen.getByTestId('convertion-info');
            expect(result).toHaveTextContent(`${formatAmountInCurrency(amounts[i],'PLN')} = ${formatAmountInCurrency(afterConversion[i].toFixed(2),'USD')}`);

            // cleanup
            cleanup();
        }
        
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        
        const amounts= [15, 33, 76, 100, 186, 272, 397, 555, 1021, 2000];

        const afterConversion = amounts.map((amount)=>(Math.max(amount*3.5, 0)));
        
        for (let i = 0; i < amounts.length; i++) {
            // render component
            render(<ResultBox from= {'USD'} to={ 'PLN'}  amount= {amounts[i]}  />);
            // find result element
            const result = screen.getByTestId('convertion-info');
            expect(result).toHaveTextContent(`${formatAmountInCurrency(amounts[i],'USD')} = ${formatAmountInCurrency(afterConversion[i].toFixed(2),'PLN')}`);

            // cleanup
            cleanup();
        }
        
    });

    it('should the same value before and after conversion when the currency is the same', () => {
            
        const currAmountPairs= [
            ['PLN', 33],
            ['USD', 100],
            ['PLN', 200],
            ['USD', 555],
            ['PLN', 1021],
            ['USD', 2000]
        ];
        
        for (let i = 0; i < currAmountPairs.length; i++) {
            // render component
            render(<ResultBox from= {currAmountPairs[i][0]} to={ currAmountPairs[i][0]}  amount= {currAmountPairs[i][1]}  />);
             // find result element
            const result = screen.getByTestId('convertion-info');
            const leftSide = result.textContent.split('=')[0].trim();
            const rightSide = result.textContent.split('=')[1].trim();

            expect(leftSide).toEqual(rightSide);

            // cleanup
            cleanup();
        }
});

it('should not accept negative amount and print “Wrong value…” message', () => {
            
    const currAmountPairs= [
        ['PLN', 'PLN', -33],
        ['USD', 'USD', -100],
        ['PLN', 'USD', -200],
        ['USD', 'PLN', -555],
        ['PLN', 'USD', -1021],
        ['USD', 'PLN', -2000]
    ];
    
    for (let i = 0; i < currAmountPairs.length; i++) {
        // render component
        render(<ResultBox from= {currAmountPairs[i][0]} to={ currAmountPairs[i][1]}  amount= {currAmountPairs[i][2]}  />);
         // find result element
        const result = screen.getByTestId('convertion-info').textContent;

        expect(result).toEqual('Wrong value...');

        // cleanup
        cleanup();
    }
});
    


});