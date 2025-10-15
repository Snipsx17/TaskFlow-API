import { Client } from 'pg';
import { randomUUID } from 'crypto';

// Generar 3 usuarios con sus IDs
const users = [
  { id: randomUUID() },
  { id: randomUUID() },
  { id: randomUUID() },
];

// Generar 3 categorías con sus IDs
const categories = [
  { id: randomUUID() },
  { id: randomUUID() },
  { id: randomUUID() },
];

// Lista de 30 tareas predefinidas (10 por usuario)
const tasks = [
  // Usuario 1 - 10 tareas
  {
    title: 'Implementar autenticación JWT',
    description:
      'Desarrollar sistema de autenticación con tokens JWT para mayor seguridad',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-11-15T10:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Optimizar consultas de base de datos',
    description: 'Revisar y optimizar queries lentas para mejorar performance',
    status: 'in-progress',
    priority: 'low',
    dueDate: '2025-10-20T14:30:00.000Z',
    userId: users[0].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Crear documentación API',
    description: 'Documentar todos los endpoints con Swagger',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-11-30T09:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Configurar CI/CD pipeline',
    description:
      'Implementar pipeline de integración continua con GitHub Actions',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-10-25T16:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Diseñar dashboard de analytics',
    description: 'Crear interfaz para visualización de métricas del sistema',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-11-10T11:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Implementar sistema de caché',
    description: 'Agregar Redis para cachear respuestas frecuentes',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-10-28T13:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Actualizar dependencias',
    description:
      'Revisar y actualizar todas las librerías a versiones estables',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-10-15T10:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Implementar tests unitarios',
    description: 'Crear suite de tests para módulos críticos',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-11-05T15:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Corregir bugs de producción',
    description: 'Resolver lista de bugs reportados por usuarios',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-10-12T09:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Refactorizar módulo de pagos',
    description: 'Mejorar arquitectura del sistema de procesamiento de pagos',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-12-01T10:00:00.000Z',
    userId: users[0].id,
    categoryId: categories[0].id,
  },

  // Usuario 2 - 10 tareas
  {
    title: 'Crear sistema de notificaciones',
    description: 'Implementar notificaciones en tiempo real con WebSockets',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-11-20T14:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Optimizar imágenes del sitio',
    description: 'Comprimir y optimizar assets para mejorar tiempo de carga',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-10-10T12:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Implementar búsqueda full-text',
    description: 'Agregar capacidad de búsqueda avanzada con Elasticsearch',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-11-25T11:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Configurar monitoreo',
    description: 'Implementar sistema de logs y alertas con Datadog',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-30T16:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Diseñar sistema de roles',
    description: 'Crear arquitectura de permisos y roles de usuario',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-11-08T10:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Migrar a TypeScript',
    description: 'Convertir codebase de JavaScript a TypeScript',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-12-15T14:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Crear exportación de reportes',
    description: 'Implementar generación de reportes en PDF y Excel',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-11-18T09:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Optimizar bundle de JavaScript',
    description: 'Reducir tamaño del bundle con code splitting',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-12-05T15:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Implementar rate limiting',
    description: 'Agregar límites de peticiones para prevenir abuso',
    status: 'completed',
    priority: 'high',
    dueDate: '2025-10-08T11:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Crear onboarding de usuarios',
    description: 'Diseñar flujo de bienvenida para nuevos usuarios',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-11-22T10:00:00.000Z',
    userId: users[1].id,
    categoryId: categories[1].id,
  },

  // Usuario 3 - 10 tareas
  {
    title: 'Actualizar diseño responsive',
    description: 'Mejorar experiencia en dispositivos móviles',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-27T13:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Implementar backup automático',
    description: 'Configurar respaldos programados de la base de datos',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-10-18T09:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Crear panel de administración',
    description: 'Desarrollar interfaz para administradores del sistema',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-11-12T14:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Optimizar SEO del sitio',
    description: 'Mejorar metadatos y estructura para buscadores',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-12-10T10:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Implementar autenticación 2FA',
    description: 'Agregar autenticación de dos factores para mayor seguridad',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-11-28T11:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Crear API de webhooks',
    description: 'Desarrollar sistema de webhooks para integraciones',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-12-03T15:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Refactorizar componentes React',
    description: 'Mejorar estructura y reusabilidad de componentes',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-11-15T12:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[2].id,
  },
  {
    title: 'Implementar versionado de API',
    description: 'Agregar sistema de versiones para backward compatibility',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-10-22T10:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[0].id,
  },
  {
    title: 'Crear sistema de plantillas email',
    description: 'Diseñar templates para notificaciones por correo',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-10-05T14:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[1].id,
  },
  {
    title: 'Optimizar rendimiento del servidor',
    description: 'Analizar y mejorar tiempos de respuesta del backend',
    status: 'in-progress',
    priority: 'low',
    dueDate: '2025-10-16T09:00:00.000Z',
    userId: users[2].id,
    categoryId: categories[2].id,
  },
];

// Función principal
async function seedDatabase() {
  // Leer argumentos de línea de comandos
  const args = process.argv.slice(2);

  if (args.length < 6) {
    console.error(
      'Uso: node seed.js <host> <port> <database> <user> <password> <tableName>',
    );
    console.error(
      'Ejemplo: node seed.js localhost 5432 mydb postgres password123 tasks',
    );
    process.exit(1);
  }

  const [host, port, database, user, password, tableName] = args;

  const client = new Client({
    host,
    port: parseInt(port),
    database,
    user,
    password,
  });

  try {
    console.log('Conectando a la base de datos...');
    await client.connect();
    console.log('✓ Conectado exitosamente');

    console.log('\n📋 Información de los datos a insertar:');
    console.log(`✓ ${users.length} usuarios (cada uno con 10 tareas)`);
    console.log(`✓ ${categories.length} categorías`);
    console.log(`✓ ${tasks.length} tareas en total`);

    console.log('\n🔑 IDs generados:');
    users.forEach((u, i) => console.log(`   Usuario ${i + 1}: ${u.id}`));
    categories.forEach((c, i) => console.log(`   Categoría ${i + 1}: ${c.id}`));

    // Resetear tabla
    console.log(`\n🔄 Reseteando tabla ${tableName}...`);
    await client.query(`DELETE FROM ${tableName}`);
    console.log('✓ Tabla reseteada');

    // Insertar las 30 tareas
    console.log('\n📝 Insertando tareas...');

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      await client.query(
        `INSERT INTO ${tableName} (id, title, description, status, priority, "dueDate", "userId", "categoryId", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          randomUUID(),
          task.title,
          task.description,
          task.status,
          task.priority,
          task.dueDate,
          task.userId,
          task.categoryId,
          new Date().toISOString(),
          new Date().toISOString(),
        ],
      );

      if ((i + 1) % 10 === 0) {
        console.log(`✓ Usuario ${(i + 1) / 10}: 10 tareas insertadas`);
      }
    }

    console.log('\n✅ ¡Seed completado exitosamente!');
    console.log(`📊 ${tasks.length} tareas insertadas en la base de datos`);

    // Mostrar estadísticas
    const countResult = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
    console.log(
      `\n📈 Total de registros en ${tableName}: ${countResult.rows[0].count}`,
    );
  } catch (error) {
    console.error('\n❌ Error durante el seed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Conexión cerrada');
  }
}

// Ejecutar el seed
seedDatabase();
