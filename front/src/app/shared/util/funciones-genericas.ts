import { Component } from '@angular/core';

@Component({template: ''})

export default class FGenerico {
    public soloLetras(event: KeyboardEvent) {
        const pattern = /[a-zA-Zá-úÁ-Ú ]/;
        const inputChar = String.fromCharCode(event.charCode);
    
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    public soloTexto(event: KeyboardEvent) {
        const pattern = /[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+*[{}()?¿!¡]/;
        const inputChar = String.fromCharCode(event.charCode);
    
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    public soloNumeros(event: KeyboardEvent) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
    
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    public obtenerEmisor(numeroTarjeta: string): string {
        const primerCaracter = parseInt(numeroTarjeta.charAt(0));

        switch (primerCaracter) {
            case 3:
                return 'American Express';
            case 4:
                return 'Visa';
            case 5:
                return 'Master Card';
            default:
                return 'Emisor Desconocido';
        }
    }

    public determinarTipoTarjeta(number: string): string {
        let odd = true;
        let sum = 0;
    
        for (const num of Array.from(number).reverse()) {
            const digit = parseInt(num, 10);
    
            sum += Array.from((odd = !odd) ? (digit * 2).toString() : digit.toString())
                .map((char) => parseInt(char, 10))
                .reduce((acc, val) => acc + val, 0);
        }
    
        return sum % 10 === 0 && sum !== 0 ? 'Crédito' : 'Débito';
    }
}