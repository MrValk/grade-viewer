export function calcNeededGrade(
	currentGrade: number,
	currentWeight: number,
	wantedAverage: number,
	newWeight: number
): number {
	console.log('currentGrade: ' + currentGrade);
	console.log('currentWeight: ' + currentWeight);
	console.log('wantedAverage: ' + wantedAverage);
	console.log('newWeight: ' + newWeight);
	return (wantedAverage * (currentWeight + newWeight) - currentGrade * currentWeight) / newWeight;
}
