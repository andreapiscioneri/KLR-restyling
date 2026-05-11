#!/usr/bin/env node

/**
 * CMS Backup & Restore Utility
 * 
 * Usage:
 *   npm run cms:backup        # Crea un backup di tutti i contenuti
 *   npm run cms:list          # Lista tutti i backup disponibili
 *   npm run cms:restore <id>  # Ripristina da un backup specifico
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BACKUP_DIR = path.join(process.cwd(), '.backups');

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

async function backup() {
  try {
    ensureBackupDir();
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupId = `cms-backup-${timestamp}`;
    const backupPath = path.join(BACKUP_DIR, backupId);
    
    if (fs.existsSync(backupPath)) {
      fs.rmSync(backupPath, { recursive: true });
    }
    
    // Copia i contenuti
    if (fs.existsSync(CONTENT_DIR)) {
      copyDir(CONTENT_DIR, backupPath);
    }
    
    // Scrivi metadata
    const metadata = {
      id: backupId,
      timestamp: new Date().toISOString(),
      contentFiles: fs.readdirSync(backupPath)
    };
    
    fs.writeFileSync(
      path.join(backupPath, '.backup-metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    
    console.log(`✅ Backup creato: ${backupId}`);
    console.log(`📍 Posizione: ${backupPath}`);
    console.log(`📅 Data: ${metadata.timestamp}`);
    console.log(`\n💡 Ripristina con: npm run cms:restore ${backupId}`);
    
  } catch (error) {
    console.error('❌ Errore durante il backup:', error.message);
    process.exit(1);
  }
}

function listBackups() {
  try {
    ensureBackupDir();
    
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(f => fs.statSync(path.join(BACKUP_DIR, f)).isDirectory())
      .sort()
      .reverse();
    
    if (backups.length === 0) {
      console.log('❌ Nessun backup trovato.');
      return;
    }
    
    console.log(`\n📦 Backup disponibili (${backups.length}):\n`);
    
    backups.forEach((backupId, index) => {
      const metadataPath = path.join(BACKUP_DIR, backupId, '.backup-metadata.json');
      let metadata = { timestamp: 'N/A' };
      
      if (fs.existsSync(metadataPath)) {
        try {
          metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        } catch (e) {
          // Ignora errore di parsing
        }
      }
      
      const date = new Date(metadata.timestamp);
      const formattedDate = date.toLocaleString('it-IT');
      
      console.log(`${index + 1}. ${backupId}`);
      console.log(`   📅 ${formattedDate}`);
      console.log(`   📁 ${(metadata.contentFiles || []).length} file\n`);
    });
    
  } catch (error) {
    console.error('❌ Errore durante la lettura dei backup:', error.message);
    process.exit(1);
  }
}

async function restore(backupId) {
  try {
    ensureBackupDir();
    
    const backupPath = path.join(BACKUP_DIR, backupId);
    
    if (!fs.existsSync(backupPath)) {
      console.error(`❌ Backup non trovato: ${backupId}`);
      console.log(`\nEsegui 'npm run cms:list' per vedere i backup disponibili.`);
      process.exit(1);
    }
    
    // Chiedi conferma
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const metadataPath = path.join(backupPath, '.backup-metadata.json');
    let metadata = {};
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    }
    
    const date = new Date(metadata.timestamp);
    const formattedDate = date.toLocaleString('it-IT');
    
    rl.question(`\n⚠️  Ripristinare il backup del ${formattedDate}?\nQuesto sovrascriverà i contenuti attuali. Continua? (s/n): `, async (answer) => {
      if (answer.toLowerCase() !== 's') {
        console.log('❌ Restore annullato.');
        rl.close();
        return;
      }
      
      try {
        // Crea un backup dei contenuti attuali
        console.log('\n📦 Creazione backup di sicurezza dei contenuti attuali...');
        await backup();
        
        // Pulisci la directory /content attuale
        console.log('🔄 Pulisci directory contenuti...');
        if (fs.existsSync(CONTENT_DIR)) {
          fs.rmSync(CONTENT_DIR, { recursive: true });
        }
        fs.mkdirSync(CONTENT_DIR, { recursive: true });
        
        // Copia i file dal backup (escludendo metadata)
        console.log('📂 Copia file dal backup...');
        const backupFiles = fs.readdirSync(backupPath)
          .filter(f => f !== '.backup-metadata.json');
        
        for (const file of backupFiles) {
          const src = path.join(backupPath, file);
          const dest = path.join(CONTENT_DIR, file);
          
          if (fs.statSync(src).isDirectory()) {
            copyDir(src, dest);
          } else {
            fs.copyFileSync(src, dest);
          }
        }
        
        console.log(`\n✅ Restore completato con successo!`);
        console.log(`📅 Data backup: ${formattedDate}`);
        console.log(`📁 File ripristinati: ${backupFiles.length}`);
        
      } catch (error) {
        console.error('❌ Errore durante il restore:', error.message);
        process.exit(1);
      }
      
      rl.close();
    });
    
  } catch (error) {
    console.error('❌ Errore durante il restore:', error.message);
    process.exit(1);
  }
}

const command = process.argv[2];

if (command === 'backup') {
  backup();
} else if (command === 'list') {
  listBackups();
} else if (command === 'restore') {
  const backupId = process.argv[3];
  if (!backupId) {
    console.error('❌ Specifica l\'ID del backup: npm run cms:restore <id>');
    console.log('\nEsegui "npm run cms:list" per vedere i backup disponibili.');
    process.exit(1);
  }
  restore(backupId);
} else {
  console.log(`
🔧 CMS Backup & Restore Utility

Comandi disponibili:
  cms:backup      - Crea un nuovo backup di tutti i contenuti
  cms:list        - Lista tutti i backup disponibili
  cms:restore ID  - Ripristina da un backup specifico

Esempi:
  npm run cms:backup
  npm run cms:list
  npm run cms:restore cms-backup-2025-05-11T14-30
  `);
}

