#### 数据类型类 DataTypes 及其API

<h5 id="">1. DataTypes类</h5>

DataTypes是一个含有常用数据类型的类，它用于使用sequelize.define()方法定义模型时指定列的数据类型：
```
sequelize.define('model', {
  column: DataTypes.INTEGER
})
```
注意：我们也可以通过模块的顶级对象Sequelize来引用指定的类型，如Sequelize.INTEGER，这种只是对DataTypes类中相关属性的一个便捷引用，其本质上还是引用了DataTypes类中相关属性。

<h5 id="">2. DataTypes类中的API</h5>
<a href="https://itbilu.com/nodejs/npm/N1XuSG-QW.html">参考</a>   

类 | 名 | 例 | 描述
-|-|-|-
STRING() | 变长字符串 | STRING() <br> STRING(64) | 将字段指定为变长字符串类型。默认长度为 255
CHAR() | 定长字符串 | CHAR() <br> CHAR(64) | 将字段指定为定长字符串类型。默认长度为 255
TEXT() | 指定为文本列 | TEXT() | 将字段指定为(无)有限长度的文本列 <br>可用长度：tiny, medium, long
INTEGER() | 整型 | INTEGER() | 32位整型 <br> 可用属性：UNSIGNED,ZEROFILL
BIGINT() | 整型 | INTEGER() | 32位整型 <br> 可用属性：UNSIGNED,ZEROFILL
INTEGER() | 长整型 | BIGINT() | 64位整型 <br> 可用属性：UNSIGNED,ZEROFILL
FLOAT() | 浮点数 | FLOAT() | 4位精度的浮点数，接受一个或两个参数表示精度 <br> 可用属性：UNSIGNED,ZEROFILL
REAL() | 浮点数 | REAL() | 8位精度的浮点数，接受一个或两个参数表示精度 <br> 可用属性：UNSIGNED,ZEROFILL
DOUBLE() | 双精度浮点数 | DOUBLE() | 32位整型 <br> 可用属性：UNSIGNED,ZEROFILL
DECIMAL() | 小数 | DECIMAL() | 小数，接受一个或两个参数表示精度 <br> 可用属性：UNSIGNED,ZEROFILL
BOOLEAN() | 布尔 | BOOLEAN() | 小数，接受一个或两个参数表示精度
TIME() | 时间类型 | TIME() | 指定为时间类型列
DATE() | 日期时间类型 | DATE() | 指定为日期时间类型列
DATEONLY() | 日期类型 | DATEONLY() | 指定为日期类型列
HSTORE() | 键/值类型 | HSTORE() | 指定为键/值类型列，仅Postgres适用
JSON() | JSON字符串类型 | JSON() | 指定为JSON字符串类型列，仅Postgres适用
JSONB() | JSONB类型 | JSONB() | 指定为预处理的JSON数据列，仅Postgres适用
NOW() | 时间默认值 | NOW() | 一个表示当前时间戳的默认值
BLOB() | 二进制类型 | BLOB() | 二进制存储类型，可用长度：tiny, medium, long
RANGE() | Range类型 | RANGE() | Range类型是表示某种元素类型的值范围的数据类型，仅Postgres适用
UUID() | UUID类型 | UUID() | UUID类型列，其默认值可以为UUIDV1或UUIDV4
UUIDV1() | UUIDV4  默认值 | UUIDV4() | 设置UUID类型列，的默认值为 UUID v4
UUIDV4() | 整型 | INTEGER() | 32位整型 <br> 可用属性：UNSIGNED,ZEROFILL
VIRTUAL() | 虚拟值 | VIRTUAL() | 一个不存储在数据库中的虚拟值。这种列在类型在需要提供一个默认值，但又不需要将其存储到数据库中时很适用。也可以用于在重新排列和存储前进行验证。如，对密码做哈希运算前进行长度验证：
ENUM() | 枚举 | ENUM() <br> DataTypes.ENUM('value', 'another value') | 枚举类型
ARRAY() | 数组 | ARRAY() <br> DataTypes.ARRAY(DataTypes.DECIMAL) | 数组类型，仅Postgres适用
GEOMETRY() | 几何类型 | ARRAY() <br> DataTypes.ARRAY(DataTypes.DECIMAL) | 几何类型，仅Postgres(PostGIS)及MySQL适用。在MySQL中可用的几何类型有：'POINT'、'LINESTRING'、'POLYGON',使用时，GeoJSON是可用的输入和返回值。在PostGIS中，GeoJSON通过PostGIS函数ST_GeomFromGeoJSON进行转换；而在MySQL中使用GeomFromText函数。
GEOGRAPHY() | 地理类型 | GEOGRAPHY() | 地理类型是一个二维空间对象

