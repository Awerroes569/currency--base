import CurrencyForm from '../../components/CurrencyForm/CurrencyForm';
import userEvent from '@testing-library/user-event';
import { render, screen, act, cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
    
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);}
    );

    it('should run action callback with proper data on form submit', () => {
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'USD', to: 'PLN' },
        ];
        
        for(const testObj of testCases) {

            const action = jest.fn();
      
            // render component
            render(<CurrencyForm action={action} />);

            // find “convert” button
            const submitButton = screen.getByText('Convert');

            // find fields elems
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from');
            const toField = screen.getByTestId('to');
            act(() => {
                // set test values to fields
                userEvent.type(amountField, testObj.amount);
                userEvent.selectOptions(fromField, testObj.from);
                
                userEvent.selectOptions(toField, testObj.to);

                // simulate user click on "convert" button
                userEvent.click(submitButton);
            });

            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to });

            // cleanup
            cleanup();
        }
      });


});