import { pipeline } from "@xenova/transformers";

class HairConditionAnalyzer {
  constructor() {
    // Hugging Face model configuration
    this.modelConfig = {
      task: "image-classification",
      model: "google/vit-base-patch16-224",
      topk: 3,
    };
  }

  async preprocessImage(imagePath) {
    // Preprocess image for model input
    const processedImagePath = path.join(
      "processed",
      `processed_${Date.now()}.jpg`
    );

    await sharp(imagePath)
      .resize(224, 224) // Resize to model input size
      .toFormat("jpeg")
      .toFile(processedImagePath);

    return processedImagePath;
  }

  async analyzeHairCondition(imagePath) {
    try {
      // Preprocess image
      const processedImagePath = await this.preprocessImage(imagePath);

      // Run classification
      const classifier = await pipeline(
        this.modelConfig.task,
        this.modelConfig.model
      );

      const results = await classifier(processedImagePath);

      // Process and map results
      const processedResults = this.interpretResults(results);

      // Clean up processed image
      fs.unlinkSync(processedImagePath);

      return processedResults;
    } catch (error) {
      console.error("Hair condition analysis failed:", error);
      throw new Error("Image analysis unsuccessful");
    }
  }

  interpretResults(classificationResults) {
    // Custom mapping of classification results to hair conditions
    const conditionMapping = {
      hair: {
        dry: {
          condition: "dry_scalp",
          recommendations: [
            "Use moisturizing shampoo",
            "Apply scalp hydration treatments",
            "Reduce heat styling",
          ],
        },
        oily: {
          condition: "oily_scalp",
          recommendations: [
            "Use clarifying shampoo",
            "Avoid heavy conditioners",
            "Regular scalp cleansing",
          ],
        },
        healthy: {
          condition: "healthy_hair",
          recommendations: [
            "Maintain current hair care routine",
            "Use protective styling",
            "Regular trims",
          ],
        },
      },
    };

    // Process top results
    const topResult = classificationResults[0];

    // Default fallback condition
    const defaultCondition = {
      condition: "unknown",
      confidence: 0,
      recommendations: ["Consult a hair care professional"],
    };

    // Find matching condition or use default
    const matchedCondition = Object.entries(conditionMapping.hair).find(
      ([key]) => topResult.label.toLowerCase().includes(key)
    );

    return {
      condition: matchedCondition
        ? matchedCondition[1].condition
        : defaultCondition.condition,
      confidence: Math.round(topResult.score * 100),
      recommendations: matchedCondition
        ? matchedCondition[1].recommendations
        : defaultCondition.recommendations,
    };
  }
}

export default HairConditionAnalyzer;
