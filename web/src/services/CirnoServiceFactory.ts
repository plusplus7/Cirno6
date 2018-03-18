import { ICirnoApi } from './ICirnoApi';
import { CirnoApi } from './CirnoApi';

class CirnoApiFactory {
    public static GetCirnoApi() : ICirnoApi {
        return new CirnoApi();
    }
}
export let api = CirnoApiFactory.GetCirnoApi();