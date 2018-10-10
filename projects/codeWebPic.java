public class codeWeb {

	public static void main() {
		javaFile betterCode = runCodeWeb(clutteredCode);
	}

	public static Code runCodeWeb(javaFile userCode) {
		if (userCode == cluttered) {
			showClutteredCode();
			MakeCodeCleaner();
		} else {
			BigInteger amountOfGoodCode = countAllGoodCode(userCode);

			for (BigInteger i = BigInteger.ZERO; i < amountOfGoodCode; i++) {
				System.out.println("Good Job!")
			}
		}
	}
}




























