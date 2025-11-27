import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const DevTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3">{t('csharp-14.content.mainTitle')}</Typography>
      <Typography paragraph>{t('csharp-14.content.overview')}</Typography>

      <Typography variant="h4">{t('csharp-14.content.features.title')}</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {(t('csharp-14.content.features.items', { returnObjects: true }) as string[]).map(
          (txt, i) => {
            const anchors = [
              'extension-members',
              'field-keyword',
              'null-conditional-assignment',
              'nameof-unbound-generics',
              'implicit-span-conversions',
              'lambda-modifiers',
              'partial-members',
              'compound-assignment',
            ];
            const id = anchors[i] ?? `feature-${i}`;
            return (
              <li key={i}>
                <a href={`#${id}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                  {txt}
                </a>
              </li>
            );
          },
        )}
      </Box>

      <Typography variant="h4">{t('csharp-14.content.useCases.title')}</Typography>

      <Typography id="extension-members" variant="h5">{t('csharp-14.content.useCases.extensionMembers.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.extensionMembers.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Extension block for instance members
extension<TSource>(IEnumerable<TSource> source)
{
    // Extension property
    public bool IsEmpty => !source.Any();
    
    // Extension method
    public IEnumerable<TSource> Where(Func<TSource, bool> predicate) 
        => source.Where(predicate);
}

// Extension block for static members
extension<TSource>(IEnumerable<TSource>)
{
    // Static extension property
    public static IEnumerable<TSource> Identity 
        => Enumerable.Empty<TSource>();
    
    // Static extension method
    public static IEnumerable<TSource> Combine(
        IEnumerable<TSource> first, 
        IEnumerable<TSource> second) 
        => first.Concat(second);
    
    // User-defined operator
    public static IEnumerable<TSource> operator + (
        IEnumerable<TSource> left, 
        IEnumerable<TSource> right) 
        => left.Concat(right);
}

// Usage
var numbers = new[] { 1, 2, 3 };
bool empty = numbers.IsEmpty;
var identity = IEnumerable<int>.Identity;
var combined = list1 + list2;`}
      />

      <Typography id="field-keyword" variant="h5">{t('csharp-14.content.useCases.fieldKeyword.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.fieldKeyword.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Before C# 14: explicit backing field
private string _message;
public string Message
{
    get => _message;
    set => _message = value ?? throw new ArgumentNullException(nameof(value));
}

// With C# 14: field keyword
public string Message
{
    get;
    set => field = value ?? throw new ArgumentNullException(nameof(value));
}

// Custom getter and setter
public int Age
{
    get => field;
    set => field = value >= 0 ? value : throw new ArgumentException("Age must be positive");
}

// Disambiguation if you have a field named 'field'
private string field = "actual field";
public string Data
{
    get;
    set => @field = value; // or this.field
}`}
      />

      <Typography id="null-conditional-assignment" variant="h5">{t('csharp-14.content.useCases.nullConditionalAssignment.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.nullConditionalAssignment.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Before C# 14
if (customer is not null)
{
    customer.Order = GetCurrentOrder();
}

// With C# 14: null-conditional assignment
customer?.Order = GetCurrentOrder();

// Works with compound assignment
cart?.TotalAmount += item.Price;
order?.Quantity -= 1;
settings?.MaxRetries *= 2;

// Right side only evaluated if left is not null
customer?.LastOrder = ExpensiveOrderLookup(); // ExpensiveOrderLookup() not called if customer is null

// Note: ++ and -- are not supported
// counter?.Value++; // Compilation error`}
      />

      <Typography id="nameof-unbound-generics" variant="h5">{t('csharp-14.content.useCases.nameofUnboundGenerics.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.nameofUnboundGenerics.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// C# 14: nameof with unbound generic types
var listName = nameof(List<>);           // "List"
var dictName = nameof(Dictionary<,>);    // "Dictionary"
var genericName = nameof(MyClass<,>);    // "MyClass"

// Before C# 14: you needed a closed type
var oldWay = nameof(List<int>);          // "List"

// Useful for logging, error messages, reflection
public void LogGenericType<T>()
{
    Console.WriteLine($"Working with {nameof(List<>)}<{typeof(T).Name}>");
}

// In exception messages
throw new InvalidOperationException(
    $"{nameof(Dictionary<,>)} cannot be empty");`}
      />

      <Typography id="implicit-span-conversions" variant="h5">{t('csharp-14.content.useCases.implicitSpanConversions.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.implicitSpanConversions.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Implicit conversions between arrays and spans
int[] array = { 1, 2, 3, 4, 5 };

// Array to Span<T>
Span<int> span = array;

// Array to ReadOnlySpan<T>
ReadOnlySpan<int> readOnlySpan = array;

// Span as extension method receiver
public static class SpanExtensions
{
    extension(Span<int> data)
    {
        public int Sum() => data.ToArray().Sum();
    }
}

int[] numbers = { 1, 2, 3 };
int total = numbers.Sum(); // Array implicitly converted to Span

// Better generic type inference
void ProcessData<T>(ReadOnlySpan<T> data) { /* ... */ }

int[] values = { 1, 2, 3 };
ProcessData(values); // T inferred as int, array converted to ReadOnlySpan<int>

// Works in method overload resolution
public void Display(IEnumerable<int> items) => Console.WriteLine("IEnumerable");
public void Display(ReadOnlySpan<int> items) => Console.WriteLine("ReadOnlySpan");

int[] data = { 1, 2, 3 };
Display(data); // Calls ReadOnlySpan overload in C# 14`}
      />

      <Typography id="lambda-modifiers" variant="h5">{t('csharp-14.content.useCases.lambdaModifiers.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.lambdaModifiers.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Before C# 14: modifiers required explicit types
delegate bool TryParse<T>(string text, out T result);
TryParse<int> oldWay = (string text, out int result) 
    => Int32.TryParse(text, out result);

// C# 14: modifiers without types
TryParse<int> parse = (text, out result) 
    => Int32.TryParse(text, out result);

// ref modifier
Func<ref int, int> increment = (ref value) => ++value;

// in modifier (read-only reference)
Func<in int, int> doubleValue = (in value) => value * 2;

// scoped modifier (limits lifetime)
delegate void Process(scoped ref int value);
Process processInt = (scoped ref value) => value += 10;

// ref readonly
Func<ref readonly int, int> readValue = (ref readonly value) => value;

// Note: params still requires explicit type
// Func<params int[], int> sum = (values) => values.Sum(); // Error
Func<params int[], int> sum = (params int[] values) => values.Sum(); // OK`}
      />

      <Typography id="partial-members" variant="h5">{t('csharp-14.content.useCases.partialMembers.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.partialMembers.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Partial constructors
public partial class Customer
{
    // Defining declaration
    public partial Customer(string name);
}

public partial class Customer
{
    // Implementing declaration
    public partial Customer(string name)
    {
        Name = name;
        CreatedAt = DateTime.UtcNow;
    }
}

// Partial events
public partial class EventPublisher
{
    // Defining declaration
    public partial event EventHandler DataChanged;
}

public partial class EventPublisher
{
    private EventHandler _dataChanged;
    
    // Implementing declaration with add/remove
    public partial event EventHandler DataChanged
    {
        add => _dataChanged += value;
        remove => _dataChanged -= value;
    }
}

// Useful for source generators
public partial class GeneratedModel
{
    // Generated part defines constructor
    public partial GeneratedModel();
    
    // Manual part implements it
    public partial GeneratedModel()
    {
        // Custom initialization logic
    }
}`}
      />

      <Typography id="compound-assignment" variant="h5">{t('csharp-14.content.useCases.compoundAssignment.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.useCases.compoundAssignment.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// Custom type with compound assignment operators
public struct Vector
{
    public double X { get; set; }
    public double Y { get; set; }
    
    // User-defined + operator
    public static Vector operator +(Vector a, Vector b)
        => new Vector { X = a.X + b.X, Y = a.Y + b.Y };
    
    // C# 14: += automatically works based on +
    // No need to define operator += separately
}

Vector v1 = new Vector { X = 1, Y = 2 };
Vector v2 = new Vector { X = 3, Y = 4 };

v1 += v2; // Works automatically! v1 is now (4, 6)

// Works for any operator you define
public struct Counter
{
    public int Value { get; set; }
    
    public static Counter operator *(Counter c, int multiplier)
        => new Counter { Value = c.Value * multiplier };
}

Counter counter = new Counter { Value = 10 };
counter *= 5; // Value is now 50

// User-defined increment/decrement
public struct Score
{
    public int Points { get; set; }
    
    public static Score operator ++(Score s)
        => new Score { Points = s.Points + 100 };
    
    public static Score operator --(Score s)
        => new Score { Points = s.Points - 50 };
}

Score score = new Score { Points = 0 };
score++;  // Points is now 100
score++;  // Points is now 200
score--;  // Points is now 150`}
      />

      <Typography variant="h4">{t('csharp-14.content.summary.title')}</Typography>
      <Typography paragraph>{t('csharp-14.content.summary.text')}</Typography>

      <Typography variant="h5">{t('csharp-14.content.summary.prosTitle')}</Typography>
      <ul>
        <li>{t('csharp-14.content.summary.pros.0')}</li>
        <li>{t('csharp-14.content.summary.pros.1')}</li>
        <li>{t('csharp-14.content.summary.pros.2')}</li>
        <li>{t('csharp-14.content.summary.pros.3')}</li>
        <li>{t('csharp-14.content.summary.pros.4')}</li>
      </ul>

      <Typography variant="h5">{t('csharp-14.content.summary.consTitle')}</Typography>
      <ul>
        <li>{t('csharp-14.content.summary.cons.0')}</li>
        <li>{t('csharp-14.content.summary.cons.1')}</li>
        <li>{t('csharp-14.content.summary.cons.2')}</li>
      </ul>

      <Typography variant="h4">{t('csharp-14.content.goodPractices.title')}</Typography>
      <ul>
        <li>{t('csharp-14.content.goodPractices.items.0')}</li>
        <li>{t('csharp-14.content.goodPractices.items.1')}</li>
        <li>{t('csharp-14.content.goodPractices.items.2')}</li>
        <li>{t('csharp-14.content.goodPractices.items.3')}</li>
        <li>{t('csharp-14.content.goodPractices.items.4')}</li>
      </ul>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <a href={t('csharp-14.content.footer.sourceUrl')} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {t('csharp-14.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-14.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DevTip, meta };
export default DevTip;
export { mod };
