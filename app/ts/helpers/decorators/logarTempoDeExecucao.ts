export function logarTempoDeExecucao(emSegundos:boolean=false) {


    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;//metodo original
        //descriptor-Nos dá acesso a implementação do método decorado através de descritor.value.
        console.log(metodoOriginal);


        let divisor = 1;
        let unidade = 'milisegundos';
        if (emSegundos) {

            divisor = 1000;
            unidade = 'segundos';
        }



        // aqui vamos substituir descriptor.value pela lógica do nosso decorator

        descriptor.value = function (...args: any[]) {//sobrescrevendo o metodo original

            console.log('---------------------------------------');

            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);

            const t1 = performance.now();

            const resultado = metodoOriginal.apply(this, args);

            console.log(`Resultado do método: ${JSON.stringify(resultado)}`);

            const t2 = performance.now();

            console.log(`${propertyKey} demorou ${t2 - t1} ms`);


            console.log('-----------------------')
            return resultado;






            // const retorno = metodoOriginal.apply(this, args);

            // console.log(retorno);

            // return retorno;

        }

        return descriptor;

    }



}