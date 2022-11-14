import { NonceCoolDown } from "./noncecooldown";
import { Source } from "./source";
import { UserCoolDown } from "./usercooldown";

export const InitializeDb = (): void => {
	Source.initialize()
		.then(async () => {
			console.log("Database Connection Established");
		})
		.catch(error => {
			console.log(error);
		});
};

export { Source, UserCoolDown, NonceCoolDown };
