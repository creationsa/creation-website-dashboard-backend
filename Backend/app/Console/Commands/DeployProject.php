<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class DeployProject extends Command
{
    protected $signature = 'deploy {environment=production : The environment to deploy to}';
    protected $description = 'Deploy the application to the specified environment';

    private $config = [
        'production' => [
            'host' => '65.108.205.228', // your server IP - e.g., '123.456.789.0'
            'username' => 'productsaaitd', // your SSH username - e.g., 'forge'
            'deploy_path' => '/home2/productsaaitd/public_html/scooter_dev', // your project path - e.g., '/var/www/myapp'
            'branch' => 'master', // your branch - e.g., 'master'
            'repository' => '', // your repository - e.g., 'git@github.com:username/repository.git'
            'php_version' => 'php8.2', // your PHP version
            'keep_releases' => 5,
            'auth_type' => '', // will be set during runtime
            'ssh_key' => 'D:\id_rsa', // default SSH key path
            'password' => '' // will be set during runtime if needed
        ],
        'staging' => [
            'host' => '', // staging server IP
            'username' => '', // staging SSH username
            'deploy_path' => '', // staging path
            'branch' => 'develop',
            'repository' => '', // same repository
            'php_version' => 'php8.2',
            'keep_releases' => 3,
            'auth_type' => '', // will be set during runtime
            'ssh_key' => 'D:\id_rsa',
            'password' => '' // will be set during runtime if needed
        ]
    ];

    private $releaseDir;

    public function handle()
    {
        // Ask user for environment
        $environment = $this->choice(
            'Which environment do you want to deploy to?',
            ['production', 'staging'],
            'production'
        );

        if (!isset($this->config[$environment])) {
            $this->error("Environment '{$environment}' not configured!");
            return 1;
        }

        // Ask user for deployment type
        $deployType = $this->choice(
            'Do you want to deploy from scratch or update the current project?',
            ['from scratch', 'update'],
            'from scratch'
        );

        // Set authentication type
        $this->setupAuthentication($environment);

        $config = $this->config[$environment];
        $this->releaseDir = date('YmdHis');

        try {
            // Test connection
            $this->info('Testing SSH connection...');
            $this->executeRemoteCommand($config, 'echo "Connection successful!"');

            if ($deployType === 'from scratch') {
                $this->info('🚀 Starting full deployment to ' . $environment . ' environment...');
                $this->validateConfig($config);
                $this->initializeDeployment($config);
                $this->cloneRepository($config);
                $this->installDependencies($config);
                $this->configureApplication($config);
                $this->runDeploymentTasks($config);
                $this->activateRelease($config);
            } else {
                $this->info('🔄 Updating current project...');
                $this->updateCurrentProject($config);
            }

            // Ask if any keys need to be added to .env
            if ($this->confirm('Do you need to add any keys to the .env file?', false)) {
                $this->addEnvKeys($config);
            }

            $this->cleanup($config);

            $this->info('✅ Deployment completed successfully!');
            return 0;
        } catch (\Exception $e) {
            $this->error('❌ Deployment failed: ' . $e->getMessage());
            $this->cleanup($config);
            return 1;
        }
    }

    private function setupAuthentication($environment)
    {
        // Ask for authentication method
        $authType = $this->choice(
            'Choose authentication method',
            ['ssh-key', 'password'],
            'ssh-key'
        );

        $this->config[$environment]['auth_type'] = $authType;

        if ($authType === 'password') {
            // Ask for password securely
            $this->config[$environment]['password'] = $this->secret('Enter SSH password:');
        } else {
            // Ask for SSH key path or use default
            $defaultKey = '~/.ssh/id_rsa';
            if ($this->confirm("Use default SSH key path ({$defaultKey})?", true)) {
                $this->config[$environment]['ssh_key'] = $defaultKey;
            } else {
                $this->config[$environment]['ssh_key'] = $this->ask('Enter path to SSH private key:');
            }
        }
    }

    private function validateConfig($config)
    {
        $required = ['host', 'username', 'deploy_path']; // , 'repository'
        foreach ($required as $field) {
            if (empty($config[$field])) {
                throw new \Exception("Configuration field '{$field}' is required!");
            }
        }
    }

    private function initializeDeployment($config)
    {
        $this->info('📂 Initializing deployment structure...');

        // $dirs = [
        //     'releases',
        //     'shared',
        //     'shared/storage',
        //     'shared/storage/app',
        //     'shared/storage/framework/cache',
        //     'shared/storage/framework/sessions',
        //     'shared/storage/framework/views',
        //     'shared/storage/logs'
        // ];

        // foreach ($dirs as $dir) {
        //     $this->executeRemoteCommand($config, "mkdir -p {$config['deploy_path']}/{$dir}");
        // }
    }

    private function cloneRepository($config)
    {
        $this->info('📥 Cloning repository...');
        // $releasePath = "{$config['deploy_path']}/releases/{$this->releaseDir}";

        // $this->executeRemoteCommand(
        //     $config,
        //     "git clone --depth 1 --branch {$config['branch']} {$config['repository']} {$releasePath}"
        // );
    }

    private function installDependencies($config)
    {
        $this->info('📦 Installing dependencies...');
        // $releasePath = "{$config['deploy_path']}/releases/{$this->releaseDir}";

        // // Install Composer dependencies
        // $this->executeRemoteCommand($config, "cd {$releasePath} && composer install --no-dev --optimize-autoloader");

        // // Install NPM dependencies if package.json exists
        // $this->executeRemoteCommand($config, "if [ -f {$releasePath}/package.json ]; then cd {$releasePath} && npm install && npm run build; fi");
    }

    private function configureApplication($config)
    {
        $this->info('⚙️ Configuring application...');
        // $releasePath = "{$config['deploy_path']}/releases/{$this->releaseDir}";
        // $sharedPath  = "{$config['deploy_path']}/shared";

        // // Copy .env file
        // $this->executeRemoteCommand($config, "cp {$config['deploy_path']}/.env {$releasePath}/.env");

        // // Create storage symlinks
        // $this->executeRemoteCommand($config, "
        //     ln -nfs {$sharedPath}/storage/app {$releasePath}/storage/app &&
        //     ln -nfs {$sharedPath}/storage/framework/cache {$releasePath}/storage/framework/cache &&
        //     ln -nfs {$sharedPath}/storage/framework/sessions {$releasePath}/storage/framework/sessions &&
        //     ln -nfs {$sharedPath}/storage/framework/views {$releasePath}/storage/framework/views &&
        //     ln -nfs {$sharedPath}/storage/logs {$releasePath}/storage/logs
        // ");
    }

    private function runDeploymentTasks($config)
    {
        $this->info('🔄 Running deployment tasks...');
        // $releasePath = "{$config['deploy_path']}/releases/{$this->releaseDir}";

        // $tasks = [
        //     'php artisan config:clear',
        //     'php artisan cache:clear',
        //     'php artisan view:clear',
        //     'php artisan route:clear',
        //     'php artisan migrate --force',
        //     'php artisan storage:link',
        //     'php artisan optimize'
        // ];

        // foreach ($tasks as $task) {
        //     $this->executeRemoteCommand($config, "cd {$releasePath} && {$config['php_version']} {$task}");
        // }
    }

    private function activateRelease($config)
    {
        $this->info('🔄 Activating new release...');
        // $releasePath = "{$config['deploy_path']}/releases/{$this->releaseDir}";

        // // Update symlink
        // $this->executeRemoteCommand(
        //     $config,
        //     "ln -nfs {$releasePath} {$config['deploy_path']}/current"
        // );

        // // Restart PHP-FPM (if needed)
        // if ($this->confirm('Do you want to restart PHP-FPM?', false)) {
        //     $this->executeRemoteCommand($config, "sudo service php{$config['php_version']}-fpm restart");
        // }

        // // Clear OPcache (if needed)
        // if ($this->confirm('Do you want to clear OPcache?', false)) {
        //     $this->executeRemoteCommand($config, "curl -X GET http://your-domain.com/opcache-clear.php");
        // }
    }

    private function cleanup($config)
    {
        $this->info('🧹 Cleaning up old releases...');

        // Keep only the specified number of releases
        // $this->executeRemoteCommand(
        //     $config,
        //     "cd {$config['deploy_path']}/releases && ls -t | tail -n +" . ($config['keep_releases'] + 1) . " | xargs -r rm -rf"
        // );
    }

    private function executeRemoteCommand($config, $command)
    {
        if ($config['auth_type'] === 'password') {
            // Using sshpass for password authentication
            $sshpassCmd = "sshpass -p " . escapeshellarg($config['password']);
            $sshOptions = "-o StrictHostKeyChecking=no";
            $sshCommand = "{$sshpassCmd} ssh {$sshOptions} {$config['username']}@{$config['host']} " . escapeshellarg($command);
        } else {
            // Using SSH key authentication
            $sshOptions = "-i " . escapeshellarg($config['ssh_key']) . " -o StrictHostKeyChecking=no";
            $sshCommand = "ssh {$sshOptions} {$config['username']}@{$config['host']} " . escapeshellarg($command);
        }

        $this->line("Executing: $command");

        $process = Process::fromShellCommandline($sshCommand);
        $process->setTimeout(null);

        try {
            $process->run(function ($type, $buffer) {
                $this->line($buffer);
            });

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }
        } catch (\Exception $e) {
            throw new \Exception('Command failed: ' . $command . "\n" . $e->getMessage());
        }
    }

    private function updateCurrentProject($config)
    {
        $this->info('🔄 Pulling latest changes...');
        $currentPath = "{$config['deploy_path']}";

        // Pull latest changes
        $this->executeRemoteCommand($config, "cd {$currentPath} && git pull");

        // Run migrations
        $this->executeRemoteCommand($config, "cd {$currentPath} && php artisan migrate --force");
    }

    private function addEnvKeys($config)
    {
        $this->info('🔑 Adding keys to .env file...');
        $currentPath = "{$config['deploy_path']}";

        // Example of adding a key
        $key = $this->ask('Enter the key you want to add:');
        $value = $this->ask('Enter the value for the key:');

        $this->executeRemoteCommand($config, "echo \"{$key}={$value}\" >> {$currentPath}/.env");
    }
}
