import { NamingStrategyInterface } from "typeorm";
import { DefaultNamingStrategy } from "typeorm";
import { camelCase, snakeCase } from "typeorm/util/StringUtils";

export class SnakeNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }

  public columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.join("_")) +
      (customName ? customName : snakeCase(propertyName))
    );
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  public joinColumnName(
    relationName: string,
    referencedColumnName: string,
  ): string {
    return snakeCase(relationName + "_" + referencedColumnName);
  }

  public joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return snakeCase(
      firstTableName +
        "_" +
        firstPropertyName.replace(/\./gi, "_") +
        "_" +
        secondTableName,
    );
  }

  public joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      tableName + "_" + (columnName ? columnName : propertyName),
    );
  }

  public classTableInheritanceParentColumnName(
    parentTableName: string,
    parentTableIdPropertyName: string,
  ): string {
    return snakeCase(parentTableName + "_" + parentTableIdPropertyName);
  }
}

export class CamelNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public tableName(className: string, customName: string): string {
    return customName ? customName : camelCase(className);
  }

  public columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      camelCase(embeddedPrefixes.join("_")) +
      (customName ? customName : camelCase(propertyName))
    );
  }

  public relationName(propertyName: string): string {
    return camelCase(propertyName);
  }

  public joinColumnName(
    relationName: string,
    referencedColumnName: string,
  ): string {
    return camelCase(relationName + "_" + referencedColumnName);
  }

  public joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return camelCase(
      firstTableName +
        "_" +
        firstPropertyName.replace(/\./gi, "_") +
        "_" +
        secondTableName,
    );
  }

  public joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return camelCase(
      tableName + "_" + (columnName ? columnName : propertyName),
    );
  }

  public classTableInheritanceParentColumnName(
    parentTableName: string,
    parentTableIdPropertyName: string,
  ): string {
    return camelCase(parentTableName + "_" + parentTableIdPropertyName);
  }
}
